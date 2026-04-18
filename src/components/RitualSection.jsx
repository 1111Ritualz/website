import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ritvid from '../assets/videos/ritvid.mp4';

const RitualSection = () => {
    const { scrollYProgress } = useScroll();

    // Scale effects for cinematic feel
    const bgScale = useTransform(scrollYProgress, [0.3, 0.6], [1.1, 1]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', overflow: 'hidden' }}>
            {/* THE RITUAL - Intro */}
            <section style={{ padding: '2rem 2rem 4rem', textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                    className="container"
                >
                    <span style={{
                        color: 'var(--color-gold)',
                        letterSpacing: '8px',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        THE RITUAL
                    </span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem' }}>
                        Turn Your Bath Into a Ritual
                    </h2>
                    <p style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.2rem',
                        lineHeight: '1.8',
                        color: 'var(--color-text)'
                    }}>
                        11:11 Ritualz is built on a simple idea… small rituals can change how you feel, every day.
                        We take something you already do and turn it into a moment of reset.
                    </p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100px' }}
                        style={{
                            height: '1px',
                            backgroundColor: 'var(--color-gold)',
                            margin: '3rem auto'
                        }}
                    />
                    <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                        Not just to relax you, but to help you let go.
                    </p>
                </motion.div>
            </section>

            {/* Understanding the Problem */}
            <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-dark)', color: '#fff' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textVariants}
                    >
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Understanding the Problem</h3>
                        <h4 style={{ color: 'var(--color-gold)', fontSize: '1.1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            What You Carry Through the Day
                        </h4>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
                            The argument that ended but didn’t leave. The meeting that drained something you can’t name. The energy of thirty people in a room that somehow followed you home.
                            You shower. You feel cleaner.
                            But you don’t feel clear.
                            There is a difference. You know this. You’ve always known this.
                        </p>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500', color: '#fff' }}>
                            <i>And no one has ever given you something designed for that difference.</i>
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
                        }}
                        style={{
                            padding: '3rem',
                            border: '1px solid var(--color-gold-light)',
                            background: 'rgba(255,255,255,0.05)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ position: 'absolute', top: '-10px', left: '20px', background: 'var(--color-dark)', padding: '0 10px', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px' }}>
                            INSIGHT
                        </div>
                        <h4 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'white' }}>In Shantana’s family, the cure was simple.</h4>
                        <p style={{ color: 'white' }}>
                            If something feels off, go to the ocean. Not for a swim, but for what the water takes away.

                            What you carry isn’t always visible.
                            But it’s felt.

                            Across cultures, it has always been understood. In her grandmother’s home on the Konkan coast, it didn’t need a name.
                            <br />
                            <p style={{ marginTop: '1rem', color: 'white' }}><i><b>Just step in. And let it go.</b></i></p>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* THE IDEA */}
            <section style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <video
                    src={ritvid}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        objectFit: 'cover',
                        zIndex: 1
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(250,249,246,0.8), rgba(250,249,246,0.4), rgba(250,249,246,0.8))',
                    zIndex: 2
                }} />

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    style={{
                        position: 'relative',
                        zIndex: 3,
                        textAlign: 'center',
                        maxWidth: '800px',
                        padding: '0 2rem'
                    }}
                >
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '10px', textTransform: 'uppercase', fontSize: '0.9rem' }}>THE IDEA</span>
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: '1.5rem 0' }}>You live far from the ocean</h3>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-dark)', lineHeight: '1.6' }}>
                        We Know
                        That is exactly why we made <strong> Ocean's Shield</strong>.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn"
                        style={{ marginTop: '2rem' }}
                    >
                        Begin
                    </motion.button>
                </motion.div>
            </section>

            {/* THE IDEA ends */}
        </div>
    );
};

export default RitualSection;
