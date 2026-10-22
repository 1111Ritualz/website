/**
 * Pincode serviceability lookup.
 *
 * IMPORTANT — read before swapping providers.
 * The Delhivery API authorizes creating shipments, generating labels and raising
 * pickups. A Delhivery token therefore must NEVER be placed in this file or in any
 * other file under src/. Everything bundled here ships to the public in the JS
 * output, so a token placed here is readable by anyone who views source and is
 * trivially extracted.
 *
 * Delhivery also does not send CORS headers, so the browser cannot reach it
 * directly regardless. Any Delhivery check has to be proxied through a server
 * that holds the token. See `lookupViaDelhiveryProxy` below — point
 * VITE_SERVICEABILITY_PROVIDER at 'delhivery' once that proxy exists.
 *
 * The default provider is the Government of India Post API. It needs no key,
 * sends Access-Control-Allow-Origin: *, and confirms a pincode exists and is
 * deliverable — enough to gate checkout. It does not reflect Delhivery's own
 * coverage or COD eligibility.
 */

/* ─── Configuration ──────────────────────────────────────── */
const PROVIDER = import.meta.env?.VITE_SERVICEABILITY_PROVIDER || 'indiapost';
const DELHIVERY_PROXY_URL = import.meta.env?.VITE_DELHIVERY_PROXY_URL || '';
const LOOKUP_TIMEOUT_MS = 8000;

/**
 * Verdict codes returned to the UI.
 *   ok           — confirmed deliverable
 *   invalid      — syntactically wrong, never queried
 *   unserviceable— confirmed not deliverable; checkout is blocked
 *   unreachable  — lookup failed (offline, timeout, provider down); NOT blocked
 */
export const SERVICEABILITY = {
    OK: 'ok',
    INVALID: 'invalid',
    UNSERVICEABLE: 'unserviceable',
    UNREACHABLE: 'unreachable',
};

/* ─── Small cache ───────────────────────────────────────────
   Pincodes are stable, and customers retype them constantly
   while editing an address. One network call per pincode is
   plenty; there is no need to re-query on every keystroke. */
const cache = new Map();

const VERDICT = (status, message, extra = {}) => ({
    status,
    message,
    city: '',
    district: '',
    state: '',
    cod: null,
    offices: [],
    ...extra,
});

/* ─── India Post (default, keyless) ───────────────────────── */
async function lookupViaIndiaPost(pincode, signal) {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
        signal,
        headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`India Post responded ${res.status}`);

    const body = await res.json();
    const record = Array.isArray(body) ? body[0] : body;

    if (!record || record.Status !== 'Success' || !record.PostOffice?.length) {
        return VERDICT(
            SERVICEABILITY.UNSERVICEABLE,
            'We do not currently deliver to this pincode. Please check the pincode or try a different address.'
        );
    }

    const offices = record.PostOffice;
    const first = offices[0];

    // Every office lists a DeliveryStatus. If none of them accept delivery the
    // pincode exists but is not a valid destination for us.
    const deliverable = offices.some(o => /deliver/i.test(o.DeliveryStatus || ''));
    if (!deliverable) {
        return VERDICT(SERVICEABILITY.UNSERVICEABLE, 'This pincode is not serviceable for delivery.');
    }

    return VERDICT(SERVICEABILITY.OK, '', {
        city: first.City || first.Block || '',
        district: first.District || '',
        state: first.State || '',
        offices: offices.map(o => o.Name).filter(Boolean),
    });
}

/* ─── Delhivery (via your own server-side proxy) ─────────────
   Expected proxy response — keep it deliberately narrow so the
   raw Delhivery payload and the token never reach the browser:

     { "serviceable": true, "city": "Pune", "district": "Pune",
       "state": "Maharashtra", "cod": true }

   The proxy is expected to map Delhivery's
   delivery_codes[].postal_code object down to that shape. */
async function lookupViaDelhiveryProxy(pincode, signal) {
    if (!DELHIVERY_PROXY_URL) {
        return VERDICT(
            SERVICEABILITY.UNREACHABLE,
            'Delivery check is not configured yet. Please confirm your pincode.'
        );
    }

    const res = await fetch(`${DELHIVERY_PROXY_URL}?pincode=${encodeURIComponent(pincode)}`, {
        signal,
        headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`Proxy responded ${res.status}`);

    const data = await res.json();
    if (!data?.serviceable) {
        return VERDICT(
            SERVICEABILITY.UNSERVICEABLE,
            'We do not currently deliver to this pincode. Please check the pincode or try a different address.',
            { city: data?.city || '', district: data?.district || '', state: data?.state || '', cod: data?.cod ?? null }
        );
    }

    return VERDICT(SERVICEABILITY.OK, '', {
        city: data.city || '',
        district: data.district || '',
        state: data.state || '',
        cod: data.cod ?? null,
    });
}

/* ─── Public API ──────────────────────────────────────────── */
/**
 * Check whether a pincode can be delivered to.
 *
 * Never throws. A failed lookup resolves to SERVICEABILITY.UNREACHABLE so the
 * caller can warn without blocking a paying customer because a third party was
 * briefly down.
 *
 * @param {string} pincode
 * @returns {Promise<{status: string, message: string, city: string, district: string, state: string, cod: boolean|null, offices: string[]}>}
 */
export async function checkServiceability(pincode) {
    const pin = String(pincode || '').trim();

    if (!/^\d{6}$/.test(pin)) {
        return VERDICT(SERVICEABILITY.INVALID, '');
    }

    if (cache.has(pin)) return cache.get(pin);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);

    try {
        const provider = PROVIDER === 'delhivery' ? lookupViaDelhiveryProxy : lookupViaIndiaPost;
        const verdict = await provider(pin, controller.signal);

        // Only cache decisive answers. A transient failure should be retried on
        // the next keystroke rather than pinned for the rest of the session.
        if (verdict.status !== SERVICEABILITY.UNREACHABLE) cache.set(pin, verdict);
        return verdict;
    } catch {
        return VERDICT(
            SERVICEABILITY.UNREACHABLE,
            'We could not verify this pincode just now. Please double-check it before paying.'
        );
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Whether a verdict should stop the customer from paying.
 * Only a confirmed non-serviceable pincode blocks. Unknown and unreachable
 * verdicts let the order through, since the address is captured either way and
 * a bad address can be corrected before dispatch.
 */
export function blocksCheckout(verdict) {
    return verdict?.status === SERVICEABILITY.UNSERVICEABLE;
}
