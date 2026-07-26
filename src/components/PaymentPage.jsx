import React, { useState } from 'react';
import { generateInvoicePDF } from '../services/invoiceGenerator';
import { sendInvoiceEmail } from '../services/emailService';
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
        totalAmount: 1499, quantity: 1, productId: 1, productName: "Ocean's Shield"
    };

    /* ── Form state ── */
    const [phone,   setPhone]   = useState('');
    const [address, setAddress] = useState({
        fullName: '', line1: '', line2: '', city: '', state: '', pincode: ''
    });
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

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
            amount:       payload.totalAmount * 100,   // paise (1 INR = 100 paise)
            currency:     'INR',
            name:         '1111 Ritualz',
            description:  `${payload.productName || "Ocean's Shield"} × ${payload.quantity}`,
            image:        'https://www.1111ritualz.com/logo192.png',   // optional brand logo
            prefill: {
                name:    address.fullName,
                contact: phone,
                email:   user?.email || '',
            },
            notes: {
                address:   `${address.line1}, ${address.line2 || ''}, ${address.city}, ${address.state} - ${address.pincode}`,
                productId: `prod_00${payload.productId}`,
            },
            theme: { color: '#1a1a1a' },

            handler: async (response) => {
                /* Payment successful — save order → generate invoice → email → redirect */
                const orderPayload = {
                    userId:            user?.username || user?.sub || 'anonymous',
                    email:             user?.email || '',
                    phone,
                    productId:         `prod_00${payload.productId}`,
                    productName:       payload.productName || "Ocean's Shield",
                    quantity:          payload.quantity || 1,
                    totalAmount:       payload.totalAmount || 1499,
                    address,
                    paymentMethod:     'razorpay',
                    razorpayPaymentId: response.razorpay_payment_id,
                    createdAt:         new Date().toISOString(),
                    status:            'ORDER PLACED',
                };
                try {
                    const orderId = await saveOrderToBackend(orderPayload);
                    const fullOrder = { ...orderPayload, orderId };

                    // 1. Generate PDF — download + get base64 for email
                    const pdfResult = await generateInvoicePDF(fullOrder, false);
                    pdfResult.doc.save(pdfResult.fileName); // trigger download

                    // 2. Send email in background (non-blocking)
                    sendInvoiceEmail(fullOrder, pdfResult.base64, pdfResult.fileName)
                        .catch(err => console.warn('Email send failed (non-fatal):', err));

                    setLoading(false);
                    navigate('/orders', { state: { orderId, ...payload } });
                } catch {
                    const fallbackId = 'ORD-' + response.razorpay_payment_id.slice(-6);
                    const fallbackOrder = { ...orderPayload, orderId: fallbackId };
                    const pdfResult = await generateInvoicePDF(fallbackOrder, false);
                    pdfResult.doc.save(pdfResult.fileName);
                    sendInvoiceEmail(fallbackOrder, pdfResult.base64, pdfResult.fileName)
                        .catch(() => {});
                    setLoading(false);
                    navigate('/orders', { state: { orderId: fallbackId, ...payload } });
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
        const msg =
            `Hi, I'd like to order:\n` +
            `• Product: ${payload.productName || "Ocean's Shield"}\n` +
            `• Qty: ${payload.quantity}\n` +
            `• Total: ₹${payload.totalAmount.toLocaleString()}\n` +
            `• Phone: ${phone}\n` +
            `• Address: ${addrStr}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const handleCancel = () => navigate(`/product/${payload.productId}`);

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
                    <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                        {payload.productName || "Ocean's Shield"} × {payload.quantity}
                    </p>
                    <div style={{
                        marginTop: '1.2rem',
                        fontSize: '2rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--color-gold)',
                    }}>
                        ₹ {payload.totalAmount.toLocaleString()}
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
                        placeholder="John Doe"
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
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                            placeholder="411001"
                            style={inputStyle}
                        />
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
                        {loading ? 'Processing…' : 'Pay with Razorpay'}
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
