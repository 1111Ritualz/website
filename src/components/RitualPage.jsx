import React from 'react';
import OceanVisionSection from './OceanVisionSection';
import RitualSection from './RitualSection';

const RitualPage = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <OceanVisionSection />
            <RitualSection />
            <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-cream)' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to Begin?</h2>
                <button className="btn" style={{ padding: '1.2rem 4rem' }}>Shop Ocean's Shield</button>
            </div>
        </div>
    );
};

export default RitualPage;
