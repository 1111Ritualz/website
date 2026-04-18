import React from 'react';
import PolicyLayout from './PolicyLayout';

const ShippingPolicy = () => {
    return (
        <PolicyLayout title="Shipping Policy">
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>1. Processing Times</h3>
            <p>Our rituals are made in small batches with specific intention. Please allow 3-5 business days for us to hand-pound and energise your order before dispatch.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>2. Domestic Shipping (India)</h3>
            <p>We ship nationwide. Standard delivery typically takes 5-7 business days after dispatch depending on your location.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>3. Tracking</h3>
            <p>Once your order is on its way, you will receive a tracking link via email and WhatsApp. </p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>4. Packaging</h3>
            <p>We use eco-conscious, minimal packaging designed to protect the physical jar and retain the energetic integrity of the botanicals.</p>
        </PolicyLayout>
    );
};

export default ShippingPolicy;
