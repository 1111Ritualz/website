import React from 'react';
import PolicyLayout from './PolicyLayout';

const SafetyInstructions = () => {
    return (
        <PolicyLayout title="Safety Instructions">
            <p>To ensure your ritual experience is safe and beneficial, please follow these guidelines:</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>1. Patch Test</h3>
            <p>Before your first full ritual, mix a small amount of the salt with water and apply to a small area of skin. Wait 24 hours to ensure no sensitivity occurs.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>2. Internal Use</h3>
            <p>Our ritual salts and herbs are for EXTERNAL USE ONLY. Do not ingest.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>3. Storage</h3>
            <p>Keep the jar tightly sealed in a cool, dry place. Moisture inside the jar will cause the minerals to clump and the energetic charge of the herbs to degrade.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>4. Pregnancy & Health</h3>
            <p>If you are pregnant, nursing, or have a chronic health condition, consult your physician before using mineral-rich bath products.</p>
            
            <h3 style={{ margin: '2rem 0 1rem', color: 'var(--color-dark)' }}>5. Slippage</h3>
            <p>Be careful when exiting the bath or shower, as minerals and herbs can make surfaces slightly slippery.</p>
        </PolicyLayout>
    );
};

export default SafetyInstructions;
