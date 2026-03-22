import React from 'react';

const ingredients = [
    { name: 'Unrefined Sea Salt', desc: 'Mineral-rich, deeply cleansing', icon: '🌊' },
    { name: 'Bay Leaves', desc: 'Known for purification', icon: '🌿' },
    { name: 'Rosemary', desc: 'Supports clarity', icon: '🌱' },
    { name: 'Lavender', desc: 'Calms the body and mind', icon: '💜' },
    { name: 'Cardamom', desc: 'Balances and uplifts', icon: '✨' },
    { name: 'Camphor', desc: 'Deeply refreshing and resetting', icon: '❄️' },
];

const Narrative = () => {
    return (
        <div>
            {/* ── INTRO: Not all cleansing is visible ── */}
            <section style={{
                padding: '8rem 2rem',
                textAlign: 'center',
                backgroundColor: 'var(--color-cream)',
            }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <p style={{
                        color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.8rem',
                        textTransform: 'uppercase', marginBottom: '2rem'
                    }}>
                        The Ritual
                    </p>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        lineHeight: 1.2,
                        marginBottom: '2rem',
                        color: 'var(--color-dark)',
                    }}>
                        Not all cleansing is visible.
                    </h2>
                    <div style={{ width: '50px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto 2.5rem' }} />
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--color-text-light)' }}>
                        What you carry through the day deserves to be washed away, entirely.
                        11:11 Ritualz helps you cleanse not just your body, but your energy.
                    </p>
                </div>
            </section>

            {/* ── WHAT YOU CARRY ── */}
            <section style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                minHeight: '500px',
            }}>
                <div style={{
                    backgroundColor: 'var(--color-dark)',
                    padding: '6rem 5rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        Understanding the Problem
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff', marginBottom: '2.5rem', lineHeight: 1.3 }}>
                        What You Carry Through the Day
                    </h2>
                    <div style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p>You start your day fresh.</p>
                        <p>But as the day goes on, things build up—stress, conversations, noise, and energy that isn't yours.</p>
                        <p>By the time the day ends, you're not just tired. You're carrying it all.</p>
                        <p style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>
                            And nothing in your routine actually removes or prepares you for a 'reset'.
                        </p>
                    </div>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, #e8dcc8 0%, #d4c4a0 100%)',
                    padding: '6rem 5rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2.5rem', lineHeight: 1.3 }}>
                        Cleansing Goes Beyond the Physical
                    </h2>
                    <div style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-grey)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p>Cleansing was never just about the body.</p>
                        <p>Beyond what you can see, you carry tension, mental clutter, and emotional weight.</p>
                        <p>And just like your body, that needs to be released too.</p>
                    </div>
                </div>
            </section>

            {/* ── TURN YOUR BATH ── */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-cream)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        The Idea
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', lineHeight: 1.3 }}>
                        Turn Your Bath Into a Ritual
                    </h2>
                    <div style={{ width: '50px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto 2.5rem' }} />
                    <div style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p>11:11 Ritualz is built on a simple idea… small rituals can change how you feel, every day.</p>
                        <p>We take something you already do and turn it into a moment of reset.</p>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-dark)' }}>
                            Not just to relax you, but to help you let go.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── OCEAN'S SHIELD INGREDIENTS ── */}
            <section style={{ backgroundColor: '#0d1a1f', padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Ocean's Shield
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
                            Your Daily Reset
                        </h2>
                        <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            End the day clean. Completely.
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.8 }}>
                            Ocean's Shield is an energised bath salt designed to help you release what the day leaves behind.
                        </p>
                    </div>

                    <p style={{
                        textAlign: 'center', letterSpacing: '4px', textTransform: 'uppercase',
                        color: 'var(--color-gold)', fontSize: '0.75rem', marginBottom: '3rem'
                    }}>
                        Crafted With
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1px',
                        backgroundColor: 'rgba(212,175,55,0.2)',
                        border: '1px solid rgba(212,175,55,0.2)',
                    }}>
                        {ingredients.map((ing) => (
                            <div key={ing.name} style={{
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                backgroundColor: '#0d1a1f',
                                transition: 'background-color 0.3s',
                                cursor: 'default',
                            }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = '#132027'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = '#0d1a1f'}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '1.2rem' }}>{ing.icon}</div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>
                                    {ing.name}
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                    {ing.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p style={{
                        textAlign: 'center', marginTop: '3rem',
                        color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontStyle: 'italic'
                    }}>
                        Each ingredient is chosen to support both your body and your state of mind.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Narrative;
