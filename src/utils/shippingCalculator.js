/**
 * DTDC Shipping Rate Calculator
 * Based on quotation from Shrikant Enterprises (Harshad Renuse)
 * DTDC Courier & Cargo Ltd — Sarasbag, Patil Plaza Branch, Pune 411009
 * Quotation Date: 13/10/2026
 *
 * Service: Ecommerce Ground Express (7D) — Surface
 *
 * Zones:
 *   City    — Pune pincodes starting with 411
 *   Region  — All Maharashtra (excluding City and Zone)
 *   Zone    — Nagpur & Vidarbha: Amravati, Yavatmal, Wardha, Chandrapur, Gondia, Akola, Buldhana
 *   Metro   — Delhi (110), Kolkata (700), Chennai (600), Bangalore (560), Hyderabad (500)
 *   ROI     — Rest of India (other than Metro)
 *   Spl     — Assam, Bhubaneswar, Darjeeling, Leh Ladakh, Orissa, Sikkim, W. Bengal (ex Kolkata), J&K
 *
 * Weight rules:
 *   - 1 bottle = 350g (actual weight)
 *   - Volumetric weight = L×H×B / 4750 cm (surface)
 *   - Use whichever is higher
 *   - Slab: first 500g, then additional 500g blocks, then per-KG > 5KG
 *
 * Free shipping: order subtotal > ₹2,000
 */

/* ─── DTDC 7D (Ground / Surface) Rates (₹ incl. GST @0%) ─── */
const RATES_7D = {
    //           first500g  addl500g  addlPerKgAbove5kg
    city:   { first: 37, addl500: 29, addlKg: 39 },
    region: { first: 41, addl500: 32, addlKg: 41 },
    zone:   { first: 44, addl500: 36, addlKg: 44 },
    metro:  { first: 63, addl500: 46, addlKg: 49 },
    roi:    { first: 66, addl500: 47, addlKg: 59 },
    spl:    { first: 81, addl500: 62, addlKg: 81 },
};

/* ─── Special destination states / regions ─── */
const SPL_STATES = [
    'assam', 'odisha', 'orissa', 'sikkim', 'west bengal',
    'arunachal pradesh', 'manipur', 'meghalaya', 'mizoram',
    'nagaland', 'tripura',
    'jammu and kashmir', 'jammu & kashmir', 'ladakh',
];

/* Nagpur/Vidarbha districts — Zone tier within Maharashtra */
const VIDARBHA_DISTRICTS = [
    'nagpur', 'amravati', 'yavatmal', 'wardha', 'chandrapur',
    'gondia', 'akola', 'buldhana',
];

/* Metro pincode prefixes */
const METRO_PREFIXES = [
    '110', // Delhi
    '700', // Kolkata
    '600', // Chennai
    '560', // Bangalore
    '500', // Hyderabad
];

/* One bottle = 350g; packaging adds ~50g  */
const BOTTLE_WEIGHT_G = 350;
const PACKAGING_G = 50;

/* ─── Determine zone from pincode serviceability verdict ─── */
/**
 * @param {string} pincode  - 6-digit pincode
 * @param {object} verdict  - from checkServiceability(): { state, district, city }
 * @returns {'city'|'region'|'zone'|'metro'|'roi'|'spl'}
 */
export function detectZone(pincode, verdict) {
    const pin = String(pincode || '');
    const state = (verdict?.state || '').toLowerCase().trim();
    const district = (verdict?.district || '').toLowerCase().trim();

    /* Special destinations first */
    if (SPL_STATES.some(s => state.includes(s))) return 'spl';

    /* Metro */
    if (METRO_PREFIXES.some(prefix => pin.startsWith(prefix))) return 'metro';

    /* Maharashtra sub-tiers */
    if (state === 'maharashtra') {
        /* City = Pune (pincodes starting with 411) */
        if (pin.startsWith('411')) return 'city';

        /* Zone = Nagpur & Vidarbha */
        if (VIDARBHA_DISTRICTS.some(d => district.includes(d))) return 'zone';

        /* Otherwise rest of Maharashtra */
        return 'region';
    }

    /* Fallback = Rest of India */
    return 'roi';
}

/* ─── Compute shipping charge ─── */
/**
 * @param {number} quantity      - Number of bottles ordered
 * @param {string} zone          - 'city'|'region'|'zone'|'metro'|'roi'|'spl'
 * @param {number} subtotal      - Product subtotal (after discount), in ₹
 * @returns {{ charge: number, isFree: boolean, weightG: number, zone: string, breakdown: string }}
 */
export function calculateShipping(quantity, zone, subtotal) {
    /* Free shipping for orders above ₹2000 */
    if (subtotal >= 2000) {
        const weightG = quantity * BOTTLE_WEIGHT_G + PACKAGING_G;
        return {
            charge: 0,
            isFree: true,
            weightG,
            zone,
            breakdown: 'Free delivery on orders above ₹2,000',
        };
    }

    const rates = RATES_7D[zone] || RATES_7D.roi;
    const weightG = quantity * BOTTLE_WEIGHT_G + PACKAGING_G;

    let charge = 0;
    let breakdown = '';

    if (weightG <= 500) {
        charge = rates.first;
        breakdown = `First 500g slab (${weightG}g actual)`;
    } else if (weightG <= 5000) {
        /* First 500g + additional 500g slabs */
        charge = rates.first;
        const remaining = weightG - 500;
        const addlSlabs = Math.ceil(remaining / 500);
        charge += addlSlabs * rates.addl500;
        breakdown = `First 500g (₹${rates.first}) + ${addlSlabs}× addl 500g (₹${rates.addl500} each)`;
    } else {
        /* >5kg — per-KG above 5kg, first 5kg is 10 × 500g slabs */
        const first500g = rates.first;
        const addl500gUpTo5kg = 9 * rates.addl500; // 9 additional 500g slabs = 4500g → total 5000g
        const excessG = weightG - 5000;
        const excessKg = Math.ceil(excessG / 1000);
        charge = first500g + addl500gUpTo5kg + excessKg * rates.addlKg;
        breakdown = `First 500g (₹${first500g}) + 9× addl 500g (₹${rates.addl500}) + ${excessKg}kg excess (₹${rates.addlKg}/kg)`;
    }

    return {
        charge,
        isFree: false,
        weightG,
        zone,
        breakdown,
    };
}

/* ─── Human-readable zone label ─── */
export const ZONE_LABELS = {
    city:   'Pune City',
    region: 'Maharashtra',
    zone:   'Nagpur / Vidarbha',
    metro:  'Metro City',
    roi:    'Rest of India',
    spl:    'Special Destination',
};

/* ─── Free shipping threshold ─── */
export const FREE_SHIPPING_THRESHOLD = 2000;
