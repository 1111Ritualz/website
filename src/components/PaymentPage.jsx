import React, { useEffect, useState } from 'react';
import { generateInvoicePDF } from '../services/invoiceGenerator';
import { sendInvoiceEmail } from '../services/emailService';
import { checkServiceability, blocksCheckout, SERVICEABILITY } from '../services/serviceability';
import { detectZone, calculateShipping, ZONE_LABELS, FREE_SHIPPING_THRESHOLD } from '../utils/shippingCalculator';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Razorpay Key ──────────────────────────────────────── */
const RAZORPAY_KEY_ID = 'rzp_live_TCglX4vUFQ9KQe';
const WHATSAPP_NUMBER = '919653390161'; // India country code + number

/* ─── Load Razorpay SDK once ────────────────────────────── */
function loadRazorpayScript() {
    return new Promise((resolve) => {
        if (document.getElementById('razorpay-sdk')) return resolve(true);
        const script = document.createElement('script');
        script.id = 'razorpay-sdk';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

/* ─── Helper: save order to your AWS API ───────────────── */
async function saveOrderToBackend(orderPayload) {
    const res = await fetch(
        'https://ctif9i9ive.execute-api.ap-south-1.amazonaws.com/dev/orders',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
        }
    );
    let data = {};
    try { data = await res.json(); } catch (_) {}
    return data?.orderId || data?.id || ('ORD-' + Math.floor(Math.random() * 1_000_000));
}

/* ═══════════════════════════════════════════════════════════
   PaymentPage Component
   ═══════════════════════════════════════════════════════════ */
const PaymentPage = () => {
    const location  = useLocation();
    const navigate  = useNavigate();
    const { user }  = useAuth();

    const payload = location.state?.payload || {
        totalAmount: 1499, quantity: 1, productId: 1, productName: "Ocean's Shield",
        subtotal: 1499, discountCode: '', discountAmount: 0
    };

    /* ── Form state ── */
    const [phone,   setPhone]   = useState('');
    const [address, setAddress] = useState({
        fullName: '', line1: '', line2: '', city: '', state: '', pincode: ''
    });
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    /* ── Pincode serviceability ── */
    const [pincodeVerdict, setPincodeVerdict] = useState(null);

    /* Look the pincode up once it reaches 6 digits, debounced */
    useEffect(() => {
        const pin = address.pincode;
        if (!/^\d{6}$/.test(pin)) return;

        let cancelled = false;
        const timer = setTimeout(async () => {
            const verdict = await checkServiceability(pin);
            if (!cancelled) setPincodeVerdict({ pincode: pin, ...verdict });
        }, 500);

        return () => { cancelled = true; clearTimeout(timer); };
    }, [address.pincode]);

    /* Derived: verdict matched to current pincode */
    const isCompletePin = /^\d{6}$/.test(address.pincode);
    const isCurrentVerdict = pincodeVerdict?.pincode === address.pincode;

    const pincodeCheck = !isCompletePin
        ? { status: SERVICEABILITY.INVALID, message: '' }
        : !isCurrentVerdict
            ? { status: SERVICEABILITY.INVALID, message: '', pending: true }
            : pincodeVerdict;

    /* ── Shipping calculation ──
       Derived from pincode verdict + order quantity + product subtotal.
       We use payload.subtotal (before shipping) for the free-shipping threshold. */
    const shippingZone = (pincodeCheck.status === SERVICEABILITY.OK)
        ? detectZone(address.pincode, pincodeCheck)
        : null;

    const productSubtotal = payload.totalAmount || 0;  // post-discount product cost

    const shippingResult = (shippingZone !== null)
        ? calculateShipping(payload.quantity || 1, shippingZone, productSubtotal)
        : null;

    const shippingCharge = shippingResult?.charge ?? 0;

    /* Grand total = product total (already includes discount) + shipping */
    const grandTotal = (payload.totalAmount || 0) + shippingCharge;

    /* ── Validate form ── */
    const validate = () => {
        if (!/^\d{10}$/.test(phone)) {
            setError('Please enter a valid 10-digit phone number.');
            return false;
        }
        if (!address.fullName || !address.line1 || !address.city || !address.state || !address.pincode) {
            setError('Please fill all compulsory address fields.');
            return false;
        }
        if (!/^\d{6}$/.test(address.pincode)) {
            setError('Please enter a valid 6-digit pincode.');
            return false;
        }
        if (blocksCheckout(pincodeCheck)) {
            setError(pincodeCheck.message);
            return false;
        }
        setError('');
        return true;
    };

    /* ──────────────────────────────────────────────────────
       OPTION 1 — Razorpay
       ────────────────────────────────────────────────────── */
    const handleRazorpay = async () => {
        if (!validate()) return;
        setLoading(true);

        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded) {
            setError('Failed to load payment gateway. Please try again.');
            setLoading(false);
            return;
        }

        const options = {
            key:          RAZORPAY_KEY_ID,
            amount:       grandTotal * 100,   // paise (1 INR = 100 paise)
            currency:     'INR',
            name:         '1111 Ritualz',
            description:  `${payload.productName || "Ocean's Shield"} × ${payload.quantity}`,
            image:        'https://www.1111ritualz.com/logo192.png',
            prefill: {
                name:    address.fullName,
                contact: phone,
                email:   user?.email || '',
            },
            notes: {
                address:      `${address.line1}, ${address.line2 || ''}, ${address.city}, ${address.state} - ${address.pincode}`,
                productId:    `prod_00${payload.productId}`,
                discountCode: payload.discountCode || 'NONE',
                shippingZone: shippingZone || 'unknown',
                shippingCharge: shippingCharge,
            },
            theme: { color: '#1a1a1a' },

            handler: async (response) => {
                /* Payment successful — save order → generate invoice → email → redirect */
                const orderPayload = {
                    userId:            user?.username || user?.sub || `guest-${phone}`,
                    email:             user?.email || '',
                    phone,
                    productId:         `prod_00${payload.productId}`,
                    productName:       payload.productName || "Ocean's Shield",
                    quantity:          payload.quantity || 1,
                    subtotal:          payload.subtotal || payload.totalAmount,
                    discountCode:      payload.discountCode || '',
                    discountAmount:    payload.discountAmount || 0,
                    shippingCharge,
                    shippingZone:      shippingZone || 'unknown',
                    totalAmount:       grandTotal,
                    address,
                    paymentMethod:     'razorpay',
                    razorpayPaymentId: response.razorpay_payment_id,
                    createdAt:         new Date().toISOString(),
                    status:            'ORDER PLACED',
                };
                try {
                    const orderId = await saveOrderToBackend(orderPayload);
                    const fullOrder = { ...orderPayload, orderId };

                    // 1. Generate PDF — download & email
                    const pdfResult = await generateInvoicePDF(fullOrder, false);
                    pdfResult.doc.save(pdfResult.fileName); // trigger download

                    // 2. Send email via EmailJS
                    sendInvoiceEmail(fullOrder, pdfResult.base64, pdfResult.fileName).catch(err => console.error("Email send error:", err));

                    setLoading(false);
                    navigate('/orders', { state: { orderId, order: fullOrder } });
                } catch {
                    const fallbackId = 'ORD-' + response.razorpay_payment_id.slice(-6);
                    const fallbackOrder = { ...orderPayload, orderId: fallbackId };
                    const pdfResult = await generateInvoicePDF(fallbackOrder, false);
                    pdfResult.doc.save(pdfResult.fileName);

                    // Send email via EmailJS fallback
                    sendInvoiceEmail(fallbackOrder, pdfResult.base64, pdfResult.fileName).catch(err => console.error("Email send error:", err));

                    setLoading(false);
                    navigate('/orders', { state: { orderId: fallbackId, order: fallbackOrder } });
                }
            },

            modal: {
                ondismiss: () => setLoading(false),
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (resp) => {
            setError(`Payment failed: ${resp.error.description}`);
            setLoading(false);
        });
        rzp.open();
    };

    /* ──────────────────────────────────────────────────────
       OPTION 2 — WhatsApp
       ────────────────────────────────────────────────────── */
    const handleWhatsApp = () => {
        if (!validate()) return;
        const addrStr = `${address.fullName}, ${address.line1}${address.line2 ? ', ' + address.line2 : ''}, ${address.city}, ${address.state} - ${address.pincode}`;
        const discountStr = payload.discountCode ? `\n• Coupon Applied: ${payload.discountCode} (-₹${payload.discountAmount})` : '';
        const shippingStr = shippingResult?.isFree
            ? '\n• Shipping: Free 🎉'
            : shippingCharge > 0
                ? `\n• Shipping: ₹${shippingCharge} (${ZONE_LABELS[shippingZone] || shippingZone})`
                : '\n• Shipping: To be calculated';
        const msg =
            `Hi, I'd like to order:\n` +
            `• Product: ${payload.productName || "Ocean's Shield"}\n` +
            `• Qty: ${payload.quantity}\n` +
            `• Subtotal: ₹${(payload.subtotal || payload.totalAmount).toLocaleString()}${discountStr}${shippingStr}\n` +
            `• Grand Total: ₹${grandTotal.toLocaleString()}\n` +
            `• Phone: ${phone}\n` +
            `• Address: ${addrStr}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const handleCancel = () => navigate(-1);

    /* ─── Shared input style ─── */
    const inputStyle = {
        width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #e2e2e2',
        borderRadius: '8px', fontSize: '0.95rem', marginBottom: '1rem',
        outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
        fontFamily: 'inherit', color: 'var(--color-dark)', background: '#fafafa',
    };
    const labelStyle = {
        display: 'block', marginBottom: '0.4rem',
        color: 'var(--color-dark)', fontWeight: '600', fontSize: '0.88rem',
    };

    return (
        <div style={{
            backgroundColor: 'var(--color-cream)',
            minHeight: '100vh',
            padding: '110px 1.5rem 5rem',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <div style={{
                maxWidth: '520px', width: '100%',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                overflow: 'hidden',
            }}>
                {/* ── Header ── */}
                <div style={{
                    background: 'var(--color-dark)',
                    padding: '2.5rem 2.5rem 2rem',
                    textAlign: 'center',
                }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Secure Checkout
                    </p>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', margin: 0 }}>
                        Complete Your Order
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        {payload.productName || "Ocean's Shield"} × {payload.quantity}
                    </p>
                    {payload.discountCode && (
                        <p style={{ color: 'var(--color-gold)', fontSize: '0.85rem', margin: '0.4rem 0 0 0', fontWeight: 'bold' }}>
                            🏷️ Code {payload.discountCode} applied (-₹{payload.discountAmount})
                        </p>
                    )}

                    {/* ── Order Summary (Product + Shipping + Total) ── */}
                    <div style={{
                        marginTop: '1.2rem',
                        background: 'rgba(255,255,255,0.07)',
                        borderRadius: '10px',
                        padding: '1rem 1.4rem',
                        textAlign: 'left',
                    }}>
                        {/* Product line */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', marginBottom: '0.5rem' }}>
                            <span>Product ({payload.quantity} × bottle{payload.quantity > 1 ? 's' : ''})</span>
                            <span>₹{(payload.totalAmount || 0).toLocaleString()}</span>
                        </div>

                        {/* Shipping line */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.6rem' }}>
                            <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                                Delivery
                                {shippingZone && (
                                    <span style={{ fontSize: '0.75rem', marginLeft: '0.4rem', opacity: 0.7 }}>
                                        ({ZONE_LABELS[shippingZone]})
                                    </span>
                                )}
                            </span>
                            <span style={{
                                color: shippingResult?.isFree ? '#4caf50' : shippingResult ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
                                fontWeight: shippingResult?.isFree ? '700' : '400',
                            }}>
                                {shippingResult === null
                                    ? 'Enter pincode ↓'
                                    : shippingResult.isFree
                                        ? 'FREE 🎉'
                                        : `₹${shippingResult.charge}`}
                            </span>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '0.6rem' }} />

                        {/* Grand Total */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ color: 'var(--color-gold)', fontWeight: '700', fontSize: '0.88rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                Grand Total
                            </span>
                            <span style={{
                                fontSize: '1.8rem',
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--color-gold)',
                            }}>
                                ₹ {grandTotal.toLocaleString()}
                            </span>
                        </div>

                        {/* Free shipping nudge */}
                        {shippingResult === null && payload.totalAmount < FREE_SHIPPING_THRESHOLD && (
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', textAlign: 'center' }}>
                                🚚 Add ₹{(FREE_SHIPPING_THRESHOLD - payload.totalAmount).toLocaleString()} more for free delivery
                            </p>
                        )}
                        {shippingResult === null && payload.totalAmount >= FREE_SHIPPING_THRESHOLD && (
                            <p style={{ fontSize: '0.75rem', color: '#4caf50', marginTop: '0.5rem', textAlign: 'center', fontWeight: '600' }}>
                                ✓ You qualify for free delivery!
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Form body ── */}
                <div style={{ padding: '2.5rem' }}>

                    {/* Delivery Details */}
                    <h3 style={{
                        fontSize: '1rem', color: 'var(--color-dark)',
                        marginBottom: '1.2rem', fontWeight: '700',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                        <span style={{
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: 'var(--color-dark)', color: '#fff',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: '700', flexShrink: 0,
                        }}>1</span>
                        Delivery Details
                    </h3>

                    <label style={labelStyle}>Phone Number *</label>
                    <input
                        type="tel" value={phone} maxLength="10"
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit mobile number"
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Full Name *</label>
                    <input
                        type="text" value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        placeholder="Full Name"
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Address Line 1 *</label>
                    <input
                        type="text" value={address.line1}
                        onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                        placeholder="Flat 101, ABC Apartment"
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Address Line 2 (Optional)</label>
                    <input
                        type="text" value={address.line2}
                        onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                        placeholder="Near XYZ Mall"
                        style={inputStyle}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>City *</label>
                            <input
                                type="text" value={address.city}
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                placeholder="Pune"
                                style={{ ...inputStyle, marginBottom: 0 }}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>State *</label>
                            <input
                                type="text" value={address.state}
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                placeholder="Maharashtra"
                                style={{ ...inputStyle, marginBottom: 0 }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <label style={labelStyle}>Pincode *</label>
                        <input
                            type="text" value={address.pincode} maxLength="6"
                            inputMode="numeric"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                            onBlur={() => setError('')}
                            placeholder="411001"
                            aria-invalid={blocksCheckout(pincodeCheck)}
                            aria-describedby="pincode-status"
                            style={{
                                ...inputStyle,
                                marginBottom: pincodeCheck.message ? '0.5rem' : '1rem',
                                borderColor: blocksCheckout(pincodeCheck)
                                    ? '#c0392b'
                                    : pincodeCheck.status === SERVICEABILITY.OK ? '#2e7d32' : undefined,
                            }}
                        />

                        {/* Serviceability verdict + live shipping cost */}
                        <div id="pincode-status" aria-live="polite" style={{ minHeight: '1.25rem' }}>
                            {pincodeCheck.pending && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-dark)', opacity: 0.6, margin: '0 0 0.75rem' }}>
                                    Checking delivery availability…
                                </p>
                            )}

                            {pincodeCheck.status === SERVICEABILITY.OK && shippingResult && (
                                <div style={{
                                    background: shippingResult.isFree ? 'rgba(46,125,50,0.07)' : 'rgba(26,26,26,0.04)',
                                    border: `1px solid ${shippingResult.isFree ? '#c8e6c9' : '#e0e0e0'}`,
                                    borderRadius: '8px',
                                    padding: '0.75rem 1rem',
                                    marginBottom: '0.75rem',
                                    fontSize: '0.82rem',
                                }}>
                                    <p style={{ color: '#2e7d32', margin: '0 0 0.35rem', fontWeight: '600' }}>
                                        ✓ Deliverable to {pincodeCheck.city || 'this pincode'}
                                        {pincodeCheck.state ? `, ${pincodeCheck.state}` : ''}
                                        {' '}· <span style={{ opacity: 0.75 }}>{ZONE_LABELS[shippingZone]}</span>
                                    </p>
                                    {shippingResult.isFree ? (
                                        <p style={{ color: '#2e7d32', margin: 0, fontWeight: '700' }}>
                                            🎉 Free delivery on this order!
                                        </p>
                                    ) : (
                                        <p style={{ color: '#555', margin: 0 }}>
                                            🚚 Estimated delivery: <strong style={{ color: 'var(--color-dark)' }}>₹{shippingResult.charge}</strong>
                                            <span style={{ color: '#888', marginLeft: '0.4rem' }}>
                                                ({shippingResult.weightG}g shipment via DTDC 7D Surface)
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {pincodeCheck.status === SERVICEABILITY.UNSERVICEABLE && (
                                <p style={{ fontSize: '0.8rem', color: '#c0392b', margin: '0 0 0.75rem' }}>
                                    ✕ {pincodeCheck.message}
                                </p>
                            )}

                            {pincodeCheck.status === SERVICEABILITY.UNREACHABLE && (
                                <p style={{ fontSize: '0.8rem', color: '#b26a00', margin: '0 0 0.75rem' }}>
                                    ⚠ {pincodeCheck.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <p style={{
                            color: '#c0392b', fontSize: '0.875rem',
                            background: '#fdf0ef', border: '1px solid #f5c6c2',
                            padding: '0.7rem 1rem', borderRadius: '8px', marginBottom: '1rem',
                        }}>{error}</p>
                    )}

                    {/* ── Payment Method heading ── */}
                    <h3 style={{
                        fontSize: '1rem', color: 'var(--color-dark)',
                        margin: '0.5rem 0 1.2rem', fontWeight: '700',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                        <span style={{
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: 'var(--color-dark)', color: '#fff',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: '700', flexShrink: 0,
                        }}>2</span>
                        Choose Payment Method
                    </h3>

                    {/* ── Grand Total summary before payment ── */}
                    <div style={{
                        background: 'var(--color-cream)', borderRadius: '8px',
                        padding: '0.8rem 1rem', marginBottom: '1.2rem',
                        border: '1px solid #e8e8e8', fontSize: '0.9rem',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <span style={{ color: '#555' }}>
                            You pay today
                            {shippingResult?.isFree && (
                                <span style={{ color: '#2e7d32', marginLeft: '0.5rem', fontWeight: '600', fontSize: '0.8rem' }}>
                                    (incl. free delivery)
                                </span>
                            )}
                            {shippingResult && !shippingResult.isFree && shippingCharge > 0 && (
                                <span style={{ color: '#555', marginLeft: '0.5rem', fontSize: '0.8rem' }}>
                                    (incl. ₹{shippingCharge} delivery)
                                </span>
                            )}
                        </span>
                        <span style={{ fontWeight: '700', color: 'var(--color-dark)', fontSize: '1.1rem' }}>
                            ₹{grandTotal.toLocaleString()}
                        </span>
                    </div>

                    {/* ── Razorpay button ── */}
                    <button
                        id="btn-pay-razorpay"
                        onClick={handleRazorpay}
                        disabled={loading}
                        style={{
                            width: '100%', padding: '1rem 1.5rem', marginBottom: '1rem',
                            background: loading ? '#555' : 'var(--color-dark)',
                            color: '#fff', border: 'none', borderRadius: '10px',
                            fontSize: '1rem', fontFamily: 'var(--font-serif)',
                            letterSpacing: '1px', cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '0.6rem', transition: 'all 0.25s',
                            boxShadow: loading ? 'none' : '0 4px 15px rgba(26,26,26,0.3)',
                        }}
                        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
                    >
                        {/* Razorpay "R" icon inline SVG */}
                        <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" rx="18" fill="#2D68F0"/>
                            <path d="M26 72L48 24H62L72 50L58 56L50 36L34 72H26Z" fill="white"/>
                            <path d="M58 56L74 72H60L50 56H58Z" fill="white"/>
                        </svg>
                        {loading ? 'Processing…' : `Pay ₹${grandTotal.toLocaleString()} with Razorpay`}
                    </button>

                    {/* ── Divider ── */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem',
                    }}>
                        <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
                        <span style={{ color: '#aaa', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>or order via</span>
                        <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
                    </div>

                    {/* ── WhatsApp button ── */}
                    <button
                        id="btn-pay-whatsapp"
                        onClick={handleWhatsApp}
                        style={{
                            width: '100%', padding: '0.9rem 1.5rem', marginBottom: '1.2rem',
                            background: '#fff', color: '#25D366',
                            border: '1.5px solid #25D366', borderRadius: '10px',
                            fontSize: '0.95rem', fontFamily: 'var(--font-serif)',
                            letterSpacing: '1px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '0.6rem', transition: 'all 0.25s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#25D366';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.color = '#25D366';
                        }}
                    >
                        {/* WhatsApp icon inline SVG */}
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#25D366"/>
                            <path d="M23.5 20.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.4-.8 1-.9 1.2-.2.2-.3.2-.6 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.1 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3z" fill="white"/>
                        </svg>
                        Order on WhatsApp
                    </button>

                    {/* ── Cancel ── */}
                    <button
                        id="btn-pay-cancel"
                        onClick={handleCancel}
                        style={{
                            width: '100%', padding: '0.8rem',
                            background: 'transparent', color: '#aaa',
                            border: 'none', borderRadius: '8px',
                            fontSize: '0.9rem', cursor: 'pointer',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-dark)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#aaa'; }}
                    >
                        ← Go Back
                    </button>

                    {/* Security note */}
                    <p style={{
                        textAlign: 'center', fontSize: '0.78rem', color: '#bbb',
                        marginTop: '1.5rem', lineHeight: 1.6,
                    }}>
                        🔒 Payments powered by Razorpay · 256-bit SSL Secured
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
