import React from 'react';
import oc1 from '../assets/images/oc1.jpeg';
import oc2 from '../assets/images/oc2.jpeg';
import oc3 from '../assets/images/oc3.jpeg';

const steps = [
    { number: '01', label: 'Add', desc: "Two spoons of Ocean's Shield to water. If you're a shower person, add the salt to a mug." },
    { number: '02', label: 'Pause', desc: 'Let it dissolve. Don\'t rush this part.' },
    { number: '03', label: 'Listen', desc: 'Give it your words. Remember, water listens.' },
    { number: '04', label: 'Pour', desc: 'Pour it all over yourself and just breathe.' },
    { number: '05', label: 'Emerge', desc: 'Step out feeling more present in your present.' },
];

const benefits = [
    'Mentally lighter at the end of the day',
    'Less overwhelmed by daily stress',
    'More present and calm',
    'Better rest and recovery',
];

const Readings = () => {
    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>

            {/* ── HERO BANNER ── */}
            <div style={{
                position: 'relative',
                height: '70vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <img
                    src={oc1}
                    alt="Ocean's Shield"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)' }}
                />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        11:11 Ritualz
                    </p>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        color: '#fff',
                        lineHeight: 1.2,
                        marginBottom: '1.5rem',
                    }}>
                        Readings
                    </h1>
                    <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto' }} />
                </div>
            </div>

            {/* ── NOTICES OVER TIME ── */}
            <section style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            With Consistent Use
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginBottom: '2.5rem', lineHeight: 1.2 }}>
                            What You'll Notice Over Time
                        </h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-light)', marginBottom: '2.5rem' }}>
                            You may begin to feel:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {benefits.map((b, i) => (
                                <li key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '1.2rem',
                                    padding: '1rem 0', borderBottom: '1px solid rgba(212,175,55,0.2)',
                                    fontSize: '1rem', color: 'var(--color-text-light)'
                                }}>
                                    <span style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        border: '1px solid var(--color-gold)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0, color: 'var(--color-gold)', fontSize: '0.7rem'
                                    }}>✦</span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                        <p style={{
                            fontStyle: 'italic', marginTop: '2.5rem',
                            fontSize: '1rem', color: 'var(--color-text-light)', lineHeight: 1.8,
                            borderLeft: '3px solid var(--color-gold)', paddingLeft: '1.5rem'
                        }}>
                            This isn't instant. It's a small ritual that works over time.<br />
                            After all, Rome wasn't built in a day.
                        </p>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img src={oc2} alt="Ocean's Shield Product" style={{
                            width: '100%', aspectRatio: '3/4', objectFit: 'cover',
                            borderRadius: '2px',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-2rem', left: '-2rem',
                            width: '120px', height: '120px',
                            border: '2px solid var(--color-gold)',
                            borderRadius: '2px', zIndex: -1
                        }} />
                    </div>
                </div>
            </section>

            {/* ── HOW TO USE ── */}
            <section style={{ backgroundColor: 'var(--color-dark)', padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            The Practice
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: '#fff' }}>
                            How to Use
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
                        {steps.map((step) => (
                            <div key={step.number} style={{
                                padding: '2.5rem 1.5rem',
                                border: '1px solid rgba(212,175,55,0.25)',
                                textAlign: 'center',
                                transition: 'border-color 0.3s',
                            }}
                                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'}
                            >
                                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'rgba(212,175,55,0.3)', marginBottom: '1rem' }}>
                                    {step.number}
                                </p>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                                    {step.label}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COASTAL RITUAL + IMAGE ── */}
            <section style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <img src={oc3} alt="Coastal ritual" style={{
                            width: '100%', aspectRatio: '4/5', objectFit: 'cover',
                        }} />
                        <div style={{
                            position: 'absolute', top: '-2rem', right: '-2rem',
                            width: '120px', height: '120px',
                            border: '2px solid var(--color-gold)',
                            zIndex: -1
                        }} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            The Origin
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', marginBottom: '2rem', lineHeight: 1.2 }}>
                            Inspired by a Simple Coastal Ritual
                        </h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                            Along the Konkan coast, there's a simple belief… if something feels wrong, go to the ocean.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                            Let the water take it away.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                            Years later, that idea returned. What began as a simple blend of salts at home became a daily ritual for both Shantana and Rakshit.
                        </p>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '2.5rem' }}>
                            Now, it's yours.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CONSISTENCY BANNER ── */}
            <section style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2416 100%)',
                padding: '7rem 2rem',
                textAlign: 'center',
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '2rem' }}>
                        The Philosophy
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.3, marginBottom: '2rem' }}>
                        Built for Consistency,<br />Not Instant Results
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.7)' }}>
                        This isn't a quick fix. It's a simple practice you come back to every day.
                        Because feeling better doesn't come from doing more—it comes from doing something that works, consistently.
                    </p>
                </div>
            </section>

            {/* ── START YOUR RITUAL ── */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '2rem' }}>
                    Begin
                </p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                    Start Your Ritual
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '3rem' }}>
                    You don't need more time. You just need a moment that's yours.
                </p>
                <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: 'var(--color-gold)',
                    letterSpacing: '2px',
                    marginBottom: '3rem'
                }}>
                    See you at 11:11
                </p>
                <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto' }} />
            </section>


        </div>
    );
};

export default Readings;
