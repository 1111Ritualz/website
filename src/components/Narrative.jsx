import React from 'react';
import oc1 from '../assets/images/oc1.jpeg';
import oc2 from '../assets/images/oc2.jpeg';
import oc3 from '../assets/images/oc3.jpeg';
import ocvid from '../assets/videos/ocvid.mp4';

const ingredients = [
    { name: 'Unrefined Sea Salt', desc: 'Mineral-rich, deeply cleansing', icon: '🌊' },
    { name: 'Bay Leaves', desc: 'Known for purification', icon: '🌿' },
    { name: 'Rosemary', desc: 'Supports clarity', icon: '🌱' },
    { name: 'Lavender', desc: 'Calms the body and mind', icon: '💜' },
    { name: 'Cardamom', desc: 'Balances and uplifts', icon: '✨' },
    { name: 'Camphor', desc: 'Deeply refreshing and resetting', icon: '❄️' },
];

const steps = [
    { number: '01', label: 'Add', desc: "Two spoons of Ocean's Shield to water. If you're a shower person, add the salt to a mug." },
    { number: '02', label: 'Pause', desc: "Let it dissolve. Don't rush this part." },
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

const Narrative = () => {
    return (
        <div>
            {/* ── Responsive Styles ── */}
            <style>{`
                .narrative-split { display: grid; grid-template-columns: 1fr 1fr; min-height: 500px; }
                .narrative-split-pad { padding: 5rem 4rem; }
                .narrative-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
                .narrative-steps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; }
                .narrative-coastal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
                .narrative-ingredients-grid {
                    display: grid; grid-template-columns: repeat(3, 1fr);
                    gap: 1px; background-color: rgba(212,175,55,0.2);
                    border: 1px solid rgba(212,175,55,0.2);
                }
                .narrative-video-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 500px; }
                .narrative-video-pad { padding: 4rem; }
                @media (max-width: 768px) {
                    .narrative-split { grid-template-columns: 1fr; }
                    .narrative-split-pad { padding: 3rem 1.5rem; }
                    .narrative-benefits-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .narrative-steps-grid { grid-template-columns: 1fr 1fr; }
                    .narrative-coastal-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .narrative-ingredients-grid { grid-template-columns: 1fr 1fr; }
                    .narrative-video-section { grid-template-columns: 1fr; min-height: auto; }
                    .narrative-video-pad { padding: 2rem 1.5rem; }
                }
                @media (max-width: 480px) {
                    .narrative-steps-grid { grid-template-columns: 1fr; }
                    .narrative-ingredients-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            {/* ── INTRO: THE RITUAL ── */}
            <section style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-cream)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        THE RITUAL
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', lineHeight: 1.3 }}>
                        Turn Your Bath Into a Ritual
                    </h2>
                    <div style={{ width: '50px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto 2rem' }} />
                    <div style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <p>11:11 Ritualz is built on a simple idea… small rituals can change how you feel, every day.</p>
                        <p>We take something you already do and turn it into a moment of reset.</p>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-dark)' }}>
                            Not just to relax you, but to help you let go.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── WHAT YOU CARRY (split) ── */}
            <section id="narrative-split" className="narrative-split">
                <div className="narrative-split-pad" style={{ backgroundColor: 'var(--color-dark)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        Understanding the Problem
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#fff', marginBottom: '2rem', lineHeight: 1.3 }}>
                        What You Carry Through the Day
                    </h2>
                    <div style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.72)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <p>You start your day fresh.</p>
                        <p>But as the day goes on, things build up—stress, conversations, noise, and energy that isn't yours.</p>
                        <p>By the time the day ends, you're not just tired. You're carrying it all.</p>
                        <p style={{ color: 'var(--color-gold-light)', fontStyle: 'italic' }}>
                            And nothing in your routine actually removes or prepares you for a 'reset'.
                        </p>
                    </div>
                </div>
                <div className="narrative-split-pad" style={{ background: 'linear-gradient(135deg, #e8dcc8 0%, #d4c4a0 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '2rem', lineHeight: 1.3 }}>
                        Cleansing Goes Beyond the Physical
                    </h2>
                    <div style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-grey)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <p>Cleansing was never just about the body.</p>
                        <p>Beyond what you can see, you carry tension, mental clutter, and emotional weight.</p>
                        <p>And just like your body, that needs to be released too.</p>
                    </div>
                </div>
            </section>

            {/* ── THE IDEA ── */}
            <section style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-cream)' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        THE IDEA
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '2rem', color: 'var(--color-dark)' }}>
                        Not all cleansing is visible.
                    </h2>
                    <div style={{ width: '50px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto 2rem' }} />
                    <p style={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'var(--color-text-light)' }}>
                        What you carry through the day deserves to be washed away, entirely.
                        11:11 Ritualz helps you cleanse not just your body, but your energy.
                    </p>
                </div>
            </section>

            {/* ── OCEAN'S SHIELD INGREDIENTS ── */}
            <section style={{ backgroundColor: 'var(--color-dark)', padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            Ocean's Shield
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
                            Your Daily Reset
                        </h2>
                        <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                            End the day clean. Completely.
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.8 }}>
                            Ocean's Shield is an energised bath salt designed to help you release what the day leaves behind.
                        </p>
                    </div>

                    <p style={{ textAlign: 'center', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-gold)', fontSize: '0.75rem', marginBottom: '2rem' }}>
                        Crafted With
                    </p>

                    <div className="narrative-ingredients-grid">
                        {ingredients.map((ing) => (
                            <div key={ing.name} style={{
                                padding: '2.5rem 1.5rem', textAlign: 'center',
                                backgroundColor: 'var(--color-dark)',
                                transition: 'background-color 0.3s', cursor: 'default',
                            }}
                                onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--color-grey)'}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--color-dark)'}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{ing.icon}</div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                    {ing.name}
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                    {ing.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '2rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        Each ingredient is chosen to support both your body and your state of mind.
                    </p>
                </div>
            </section>

            {/* ── OCEAN'S SHIELD VIDEO ── */}
            <section className="narrative-video-section">
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
                    <video
                        src={ocvid}
                        autoPlay loop muted playsInline
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className="narrative-video-pad" style={{
                    backgroundColor: 'var(--color-dark)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        Ocean's Shield
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                        See it in Action
                    </h2>
                    <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
                        Watch how Ocean's Shield dissolves into your water, releasing its cleansing energy. A simple moment of pause that becomes a daily ritual of reset.
                    </p>
                </div>
            </section>

            {/* ── BENEFITS ── */}
            <section id="consistent-use" style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div className="narrative-benefits-grid">
                    <div>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            With Consistent Use
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '2rem', lineHeight: 1.2 }}>
                            What You'll Notice Over Time
                        </h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                            You may begin to feel:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {benefits.map((b, i) => (
                                <li key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '0.8rem 0', borderBottom: '1px solid rgba(212,175,55,0.2)',
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
                            fontStyle: 'italic', marginTop: '2rem',
                            fontSize: '1rem', color: 'var(--color-text-light)', lineHeight: 1.8,
                            borderLeft: '3px solid var(--color-gold)', paddingLeft: '1.5rem'
                        }}>
                            This isn't instant. It's a small ritual that works over time.<br />
                            After all, Rome wasn't built in a day.
                        </p>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <img src={oc2} alt="Ocean's Shield Product" style={{
                            width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '2px',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-1.5rem', left: '-1.5rem',
                            width: '100px', height: '100px',
                            border: '2px solid var(--color-gold)', borderRadius: '2px', zIndex: -1
                        }} />
                    </div>
                </div>
            </section>

            {/* ── HOW TO USE ── */}
            <section style={{ backgroundColor: 'var(--color-dark)', padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            The Practice
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff' }}>
                            How to Use
                        </h2>
                    </div>
                    <div className="narrative-steps-grid">
                        {steps.map((step) => (
                            <div key={step.number} style={{
                                padding: '2rem 1.2rem',
                                border: '1px solid rgba(212,175,55,0.25)',
                                textAlign: 'center', transition: 'border-color 0.3s',
                            }}
                                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'}
                            >
                                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'rgba(212,175,55,0.3)', marginBottom: '0.8rem' }}>
                                    {step.number}
                                </p>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-gold)', marginBottom: '0.8rem' }}>
                                    {step.label}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COASTAL RITUAL + IMAGE ── */}
            <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div className="narrative-coastal-grid">
                    <div style={{ position: 'relative' }}>
                        <img src={oc3} alt="Coastal ritual" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
                        <div style={{
                            position: 'absolute', top: '-1.5rem', right: '-1.5rem',
                            width: '100px', height: '100px',
                            border: '2px solid var(--color-gold)', zIndex: -1
                        }} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            The Origin
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            Inspired by a Simple Coastal Ritual
                        </h2>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                            Along the Konkan coast, there's a simple belief… if something feels wrong, go to the ocean.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                            Let the water take it away.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                            Years later, that idea returned. What began as a simple blend of salts at home became a daily ritual for both Shantana and Rakshit.
                        </p>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '2rem' }}>
                            Now, it's yours.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CONSISTENCY BANNER ── */}
            <section style={{
                background: 'linear-gradient(135deg, var(--color-dark) 0%, #5d5954 100%)',
                padding: '5rem 2rem', textAlign: 'center',
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        The Philosophy
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.3, marginBottom: '1.5rem' }}>
                        Built for Consistency,<br />Not Instant Results
                    </h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.7)' }}>
                        This isn't a quick fix. It's a simple practice you come back to every day.
                        Because feeling better doesn't come from doing more—it comes from doing something that works, consistently.
                    </p>
                </div>
            </section>

            {/* ── START YOUR RITUAL ── */}
            <section style={{ padding: '5rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-cream)' }}>
                <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    Begin
                </p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '1rem' }}>
                    Start Your Ritual
                </h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                    You don't need more time. You just need a moment that's yours.
                </p>
                <p style={{
                    fontFamily: 'var(--font-serif)', fontSize: '2rem',
                    color: 'var(--color-gold)', letterSpacing: '2px', marginBottom: '2rem'
                }}>
                    See you at 11:11
                </p>
                <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto' }} />
            </section>
        </div>
    );
};

export default Narrative;
