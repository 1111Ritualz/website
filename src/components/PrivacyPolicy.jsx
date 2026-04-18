import React from 'react';
import PolicyLayout from './PolicyLayout';

const PrivacyPolicy = () => {
    return (
        <PolicyLayout title="Privacy Policy">
            <p>Effective Date: March 25, 2026</p>
            <p>At 11:11 Ritualz, we are committed to protecting your privacy and ensuring your personal information is handled with care and respect. This policy outlines how we collect, use, and safeguard your data.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>1. Information We Collect</h3>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, shipping address, and payment information.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>2. How We Use Your Information</h3>
            <p>We use your information to process orders, communicate with you about your purchases, and send you updates about our rituals and products. We do not sell your personal data to third parties.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>3. Data Security</h3>
            <p>We implement industry-standard security measures to protect your data. Your payment information is processed through secure, encrypted gateways.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>4. Cookies</h3>
            <p>Our website uses cookies to enhance your browsing experience and analyze site traffic.</p>
            
            <p style={{ marginTop: '3rem' }}>For questions about our privacy practices, please contact us at 1111rirualz@gmail.com.</p>
        </PolicyLayout>
    );
};

export default PrivacyPolicy;
