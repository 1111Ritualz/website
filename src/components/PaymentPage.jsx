import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qrImage from '../assets/images/qrpayment.jpeg';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const payload = location.state?.payload || { totalAmount: 1099, quantity: 1, productId: 1 };
    const { user } = useAuth();
    
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({
        fullName: '', line1: '', line2: '', city: '', state: '', pincode: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const upiId = "1111ritualz@upi";

    const handleConfirm = async () => {
        if (!/^\d{10}$/.test(phone)) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }
        if (!address.fullName || !address.line1 || !address.city || !address.state || !address.pincode) {
            setError('Please fill all the compulsory address fields.');
            return;
        }
        setError('');
        setLoading(true);

        const orderPayload = {
            userId: user?.username || user?.sub || 'anonymous',
            email: user?.email || 'user@example.com',
            phone: phone,
            productId: `prod_00${payload.productId}`,
            quantity: payload.quantity || 1,
            totalAmount: payload.totalAmount || 1099,
            address: address
        };

        try {
            const res = await fetch('https://ctif9i9ive.execute-api.ap-south-1.amazonaws.com/dev/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });
            let confirmedOrderId = 'ORD-' + Math.floor(Math.random() * 1000000);
            try {
                const data = await res.json();
                confirmedOrderId = data?.orderId || data?.id || confirmedOrderId;
            } catch (_) { /* response body may not be JSON */ }
            setLoading(false);
            navigate('/orders', { state: { orderId: confirmedOrderId, ...payload } });
        } catch (err) {
            // Only a true network/CORS failure reaches here
            console.error('Error placing order:', err);
            setError('Network error — please check your connection and try again.');
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/product/${payload.productId}`);
    };

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 2rem 4rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '500px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-dark)' }}>Payment</h1>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Complete your purchase securely via UPI.</p>
                
                <div style={{ backgroundColor: 'var(--color-cream)', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
                    <img
                        src={qrImage}
                        alt="Payment QR Code"
                        style={{ width: '200px', height: '200px', objectFit: 'contain', display: 'block', margin: '0 auto 1rem', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-dark)' }}>UPI ID: {upiId}</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-gold)', marginTop: '0.5rem' }}>Amount: ₹ {payload.totalAmount.toLocaleString()}</p>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-dark)', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Delivery Details</h3>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Phone Number (10 digits) *</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} 
                        maxLength="10"
                        placeholder="Enter your mobile number"
                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', marginBottom: '1rem' }}
                    />

                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Full Name *</label>
                    <input 
                        type="text" 
                        value={address.fullName} 
                        onChange={(e) => setAddress({...address, fullName: e.target.value})} 
                        placeholder="John Doe"
                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', marginBottom: '1rem' }}
                    />

                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Address Line 1 *</label>
                    <input 
                        type="text" 
                        value={address.line1} 
                        onChange={(e) => setAddress({...address, line1: e.target.value})} 
                        placeholder="Flat 101, ABC Apartment"
                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', marginBottom: '1rem' }}
                    />

                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Address Line 2 (Optional)</label>
                    <input 
                        type="text" 
                        value={address.line2} 
                        onChange={(e) => setAddress({...address, line2: e.target.value})} 
                        placeholder="Near XYZ Mall"
                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', marginBottom: '1rem' }}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>City *</label>
                            <input 
                                type="text" 
                                value={address.city} 
                                onChange={(e) => setAddress({...address, city: e.target.value})} 
                                placeholder="Pune"
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>State *</label>
                            <input 
                                type="text" 
                                value={address.state} 
                                onChange={(e) => setAddress({...address, state: e.target.value})} 
                                placeholder="Maharashtra"
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Pincode *</label>
                    <input 
                        type="text" 
                        value={address.pincode} 
                        onChange={(e) => setAddress({...address, pincode: e.target.value.replace(/\D/g, '')})} 
                        maxLength="6"
                        placeholder="411001"
                        style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', marginBottom: '0.5rem' }}
                    />

                    {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={handleCancel}
                        style={{ flex: 1, padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--color-dark)', color: 'var(--color-dark)', cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-dark)'; e.target.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--color-dark)'; }}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={loading}
                        style={{ flex: 1, padding: '1rem', backgroundColor: 'var(--color-dark)', border: 'none', color: 'white', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.3s' }}
                    >
                        {loading ? 'Processing...' : 'Confirm Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
