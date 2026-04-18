import React from 'react';
import PolicyLayout from './PolicyLayout';

const DisclaimerPage = () => {
    return (
        <PolicyLayout title="Disclaimer">
            <p>Effective Date: March 27, 2026</p>
            <p>The information and rituals provided by 11:11 Ritualz are for educational and spiritual purposes only. They are not intended as a substitute for professional medical advice, diagnosis, or treatment.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>1. Spiritual Nature</h3>
            <p>Our products are tools for spiritual alignment and energetic cleansing based on traditional practices and modern intentionality. Results are subjective and vary by individual.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>2. Not Medical Advice</h3>
            <p>Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>3. Allergic Reactions</h3>
            <p>While we use whole herbs and natural minerals, please review the full ingredient list before use. We are not responsible for individual skin sensitivities or reactions.</p>
        </PolicyLayout>
    );
};

export default DisclaimerPage;
