import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateInvoicePDF } from '../services/invoiceGenerator';
import { sendInvoiceEmail } from '../services/emailService';

const API_BASE = 'https://ctif9i9ive.execute-api.ap-south-1.amazonaws.com/dev';

const OrdersPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [emailInput, setEmailInput] = useState('');
    const [emailingOrderId, setEmailingOrderId] = useState(null);
    const [emailStatus, setEmailStatus] = useState('');

    // Show success banner if redirected from payment
    const newOrderId = location.state?.orderId || null;
    // Guests get the just-placed order from navigation state (no account lookup).
    const guestOrder = location.state?.order || null;

    const fetchOrders = useCallback(async () => {
        // No login/signup: show only the order handed over from checkout.
        if (!user) {
            setOrders(guestOrder ? [guestOrder] : []);
            setError('');
            setLoading(false);
            return;
        }
        setLoading(true);
        setError('');
        try {
            const userId = user?.username || user?.sub || user?.email || 'anonymous';
            const res = await fetch(`${API_BASE}/orders?userId=${encodeURIComponent(userId)}`);
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const data = await res.json();
            // API may return { orders: [...] } or directly an array
            const list = Array.isArray(data) ? data : (data.orders || data.items || []);
            // Sort newest first
            list.sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0));
            setOrders(list);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            setError('Could not load your orders. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [user, guestOrder]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleSendEmail = async (order) => {
        if (!emailInput) return;
        setEmailingOrderId(order.orderId || order.id);
        setEmailStatus('sending');
        try {
            const orderWithEmail = { ...order, email: emailInput };
            const pdfResult = await generateInvoicePDF(orderWithEmail, false);
            await sendInvoiceEmail(orderWithEmail, pdfResult.base64, pdfResult.fileName);
            setEmailStatus('success');
            setTimeout(() => { setEmailingOrderId(null); setEmailStatus(''); setEmailInput(''); }, 3000);
        } catch (e) {
            setEmailStatus('error');
            setTimeout(() => { setEmailingOrderId(null); setEmailStatus(''); }, 3000);
        }
    };

    const statusStyle = (status = '') => {
        const s = status.toLowerCase();
        if (s.includes('delivered')) return { backgroundColor: '#d4edda', color: '#155724' };
        if (s.includes('shipped'))  return { backgroundColor: '#d1ecf1', color: '#0c5460' };
        if (s.includes('cancelled')) return { backgroundColor: '#f8d7da', color: '#721c24' };
        return { backgroundColor: '#fff3cd', color: '#856404' }; // default: ORDER PLACED
    };

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 2rem 4rem' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--color-dark)', textAlign: 'center' }}>
                    Your Orders
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                    Track all your 11:11 Ritualz purchases below.
                </p>

                {/* Success banner after checkout */}
                {newOrderId && (
                    <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>✅</span>
                        <div>
                            <strong>Order placed successfully!</strong>
                            <span style={{ marginLeft: '0.5rem', opacity: 0.8 }}>Order ID: {newOrderId}</span>
                        </div>
                    </div>
                )}

                {/* Controls row */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <button
                        onClick={fetchOrders}
                        disabled={loading}
                        style={{ padding: '0.6rem 1.4rem', backgroundColor: 'var(--color-dark)', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, fontSize: '0.9rem', transition: 'opacity 0.2s' }}
                    >
                        {loading ? 'Refreshing…' : '↻ Refresh Orders'}
                    </button>
                </div>

                {/* States */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--color-text-light)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                        Loading your orders…
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#fff5f5', borderRadius: '8px', color: '#c0392b' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
                        <p style={{ marginBottom: '1rem' }}>{error}</p>
                        <button onClick={fetchOrders} style={{ padding: '0.6rem 1.4rem', backgroundColor: 'var(--color-dark)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Try Again
                        </button>
                    </div>
                ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                            You have no orders yet.
                        </p>
                        <button
                            onClick={() => navigate('/product/1')}
                            style={{ padding: '0.8rem 2rem', backgroundColor: 'var(--color-dark)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
                        >
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {orders.map((order, idx) => (
                            <div
                                key={order.orderId || order.id || idx}
                                style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}
                            >
                                {/* Left: order details */}
                                <div style={{ flex: 1, minWidth: '220px' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-dark)', marginBottom: '0.4rem' }}>
                                        Order #{order.orderId || order.id}
                                    </h3>
                                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                        {order.createdAt
                                            ? new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                                            : order.date || '—'}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '0.3rem' }}>
                                        Product: {order.productId || '—'} &nbsp;|&nbsp; Qty: {order.quantity || 1}
                                    </p>
                                    <p style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--color-dark)', marginBottom: '0' }}>
                                        ₹ {Number(order.totalAmount || order.amount || 0).toLocaleString('en-IN')}
                                    </p>

                                    {/* Delivery Address */}
                                    {order.address && (
                                        <div style={{ marginTop: '1.25rem', backgroundColor: '#fdfbf7', padding: '1rem', borderRadius: '6px', border: '1px solid #eee' }}>
                                            <h4 style={{ fontSize: '0.8rem', color: 'var(--color-dark)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Delivery Address
                                            </h4>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                                                <strong>{order.address.fullName}</strong><br />
                                                {order.address.line1}
                                                {order.address.line2 && <>, {order.address.line2}</>}<br />
                                                {order.address.city}, {order.address.state} – {order.address.pincode}
                                            </p>
                                        </div>
                                    )}

                                    {/* Phone */}
                                    {order.phone && (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginTop: '0.75rem' }}>
                                            📞 {order.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Right: status badge + download */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                                    <span style={{
                                        padding: '0.4rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.82rem',
                                        fontWeight: 'bold',
                                        letterSpacing: '0.5px',
                                        ...statusStyle(order.status)
                                    }}>
                                        {order.status || 'ORDER PLACED'}
                                    </span>

                                    <button
                                        onClick={() => generateInvoicePDF(order)}
                                        title="Download PDF Invoice"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: 'var(--color-dark)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '0.82rem',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-serif)',
                                            letterSpacing: '0.5px',
                                            transition: 'opacity 0.2s',
                                            width: '100%',
                                            justifyContent: 'center'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                    >
                                        ⬇ Download Invoice
                                    </button>

                                    {/* Email Invoice UI */}
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        {emailingOrderId === (order.orderId || order.id) ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <input 
                                                    type="email" 
                                                    placeholder="Enter email..." 
                                                    value={emailInput}
                                                    onChange={e => setEmailInput(e.target.value)}
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.8rem' }}
                                                />
                                                <button 
                                                    onClick={() => handleSendEmail(order)}
                                                    disabled={emailStatus === 'sending'}
                                                    style={{
                                                        padding: '0.4rem',
                                                        backgroundColor: emailStatus === 'success' ? '#28a745' : emailStatus === 'error' ? '#dc3545' : '#17a2b8',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '0.8rem',
                                                        cursor: emailStatus === 'sending' ? 'not-allowed' : 'pointer'
                                                    }}
                                                >
                                                    {emailStatus === 'sending' ? 'Sending...' : emailStatus === 'success' ? 'Sent!' : emailStatus === 'error' ? 'Error' : 'Send'}
                                                </button>
                                                <button 
                                                    onClick={() => { setEmailingOrderId(null); setEmailStatus(''); }}
                                                    style={{ padding: '0.3rem', background: 'none', border: 'none', color: '#666', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => { setEmailingOrderId(order.orderId || order.id); setEmailInput(''); setEmailStatus(''); }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: 'transparent',
                                                    color: 'var(--color-dark)',
                                                    border: '1px solid var(--color-dark)',
                                                    borderRadius: '6px',
                                                    fontSize: '0.82rem',
                                                    cursor: 'pointer',
                                                    fontFamily: 'var(--font-serif)',
                                                    letterSpacing: '0.5px',
                                                    transition: 'all 0.2s',
                                                    width: '100%',
                                                    justifyContent: 'center'
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-dark)'; e.currentTarget.style.color = 'white'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-dark)'; }}
                                            >
                                                ✉ Email Invoice
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
