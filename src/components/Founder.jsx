import React from 'react';

const Founder = () => {
    return (
        <section className="section-padding container">
            <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: '4rem', alignItems: 'center' }}>
                {/* Helper for responsive flex layout - inline styles are limited, normally use CSS modules or classes */}
                <style>{`
          .founder-container {
            display: flex;
            flex-direction: column;
            gap: 4rem;
            align-items: center;
          }
          @media (min-width: 768px) {
            .founder-container {
              flex-direction: row;
            }
          }
        `}</style>

                <div className="founder-container">
                    <div style={{ flex: 1 }}>
                        <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop"
                            alt="Master Vani Kabir"
                            style={{ borderRadius: '8px', width: '100%' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2>Meet our Founder</h2>
                        <h4 style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-gold)' }}>Master Vani Kabir</h4>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Renowned spiritualist, author, healer, and entrepreneur Master Vani Kabir uses her unique healings and readings to simplify spirituality. Her contributions to ancient and cosmic wisdom have earned her numerous awards.
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            From the "Divorce Monk" to the "Modern Sufi" and, ultimately, to Master Vani Kabir, her remarkable spiritual journey has served as an inspiration to many who are looking for spiritual guidance.
                        </p>
                        <button className="btn">Read Full Story</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;
