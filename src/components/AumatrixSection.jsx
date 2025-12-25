import React from 'react';
import { aumatrixCodes } from '../data';

const AumatrixSection = () => {
    return (
        <section className="section-padding container">
            <div className="text-center" style={{ marginBottom: '4rem' }}>
                <h2>THE MIRACLE OF AUMATRIX™</h2>
                <p style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
                    Aumatrix™ is ancient energy returned. Created in Lemuria as the symbol that attracts miracles, it activates 5 profound areas of life. These codes form a living field of light that rewrites the destiny of the wearer.
                </p>
                <button className="btn btn-outline">Read The Full Story</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                {aumatrixCodes.map((code, index) => (
                    <div key={index} className="text-center fade-in" style={{ padding: '2rem', border: '1px solid var(--color-gold-light)', borderRadius: '8px' }}>
                        <h3 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{code.name}</h3>
                        <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{code.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AumatrixSection;
