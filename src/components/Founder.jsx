import React from 'react';
import ritualmaker from '../assets/images/ritualmaker.jpeg';

const Founder = () => {
    return (
        <section style={{ backgroundColor: '#f5f0e8', padding: '5rem 0' }}>
            <style>{`
                .founder-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                @media (max-width: 768px) {
                    .founder-layout {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            `}</style>
            <div className="founder-layout">
                <div style={{ position: 'relative' }}>
                    <img
                        src={ritualmaker}
                        alt="The Ritual Makers – Shantana and Rakshit"
                        style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '2px' }}
                    />
                    <div style={{
                        position: 'absolute', bottom: '-1.5rem', right: '-1.5rem',
                        width: '100px', height: '100px',
                        border: '2px solid var(--color-gold)',
                        borderRadius: '2px', zIndex: -1
                    }} />
                </div>
                <div>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        Our Story
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '2rem', lineHeight: 1.2 }}>
                        The Ritual Makers
                    </h2>

                    <div style={{
                        borderLeft: '3px solid var(--color-gold)',
                        paddingLeft: '2rem',
                        display: 'flex', flexDirection: 'column', gap: '1.2rem',
                    }}>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)' }}>
                            <strong style={{ color: 'var(--color-dark)' }}>It did not start as a brand.</strong> It started in a bathtub in London. What began as curiosity around salt, spices, and their deeper meanings quickly turned into something more. Shantana had always been drawn to the idea that simple ingredients could carry intention, and together with Rakshit, that curiosity turned into quiet experimentation.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)' }}>
                            It always began with one question, <em>"How are you feeling today?"</em> From there, they would create blends to match the moment. A little of this, a little of that, but always intentional. Somewhere along the way, those baths stopped being just baths. They became rituals.
                        </p>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-dark)' }}>
                            And the shift: Subtle but real.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)' }}>
                            That's when they knew this couldn't stay personal. Today, Shantana, a dentist-turned-marketeer, and Rakshit, an Aerospace Engineer with a curious mind, are building 11:11 Ritualz… bringing that same simple, powerful ritual into everyday life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;
