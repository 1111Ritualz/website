import React from 'react';
import FAQSection from './FAQSection';

const FAQPage = () => {
    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 0 80px' }}>
            {/* Reusing existing FAQSection component for consistency */}
            <FAQSection />
            <div className="container" style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-light)' }}>
                <p>Have more questions? Email us at <span style={{ color: 'var(--color-gold)' }}>1111rirualz@gmail.com</span></p>
            </div>
        </div>
    );
};

export default FAQPage;
