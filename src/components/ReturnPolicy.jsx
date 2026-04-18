import React from 'react';
import PolicyLayout from './PolicyLayout';

const ReturnPolicy = () => {
    return (
        <PolicyLayout title="Return and Refund Policy">
            <p>Effective Date: March 26, 2026</p>
            <p>Our intention is for every ritual product to reach you with the highest vibration. However, we understand that issues can arise during transit.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>1. Returns</h3>
            <p>Due to the artisanal and spiritual nature of our bath rituals, we cannot accept returns once the product seal has been broken. We maintain strict purity standards for all our materials.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>2. Damaged Items</h3>
            <p>If your jar arrives damaged or broken, please email us a photo within 48 hours of delivery at 1111rirualz@gmail.com. We will arrange for a replacement to be sent immediately.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>3. Refunds</h3>
            <p>Refunds are processed only in cases where replacements are unavailable. Once approved, the refund will be credited back to your original payment method within 7-10 business days.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>4. Cancellations</h3>
            <p>Orders can only be cancelled within 12 hours of placement, as we begin our hand-pounding process shortly after receiving orders.</p>
        </PolicyLayout>
    );
};

export default ReturnPolicy;
