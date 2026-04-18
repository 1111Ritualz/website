import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
            <section style={{ padding: '6rem 2rem', backgroundColor: '#fff' }}>
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
                        <p style={{ fontSize: '1.1rem' }}>
                            You start your day fresh. But as the day goes on, things build up—stress, conversations, noise, and energy that isn't yours.
                        </p>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--color-dark)' }}>
                            By the time the day ends, you're not just tired. You're carrying it all.
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
                            background: 'var(--color-cream)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ position: 'absolute', top: '-10px', left: '20px', background: 'white', padding: '0 10px', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '2px' }}>
                            INSIGHT
                        </div>
                        <h4 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Cleansing Goes Beyond the Physical</h4>
                        <p>Cleansing was never just about the body. Beyond what you can see, you carry tension, mental clutter, and emotional weight.</p>
                        <p style={{ marginBottom: 0 }}>And just like your body, that needs to be released too.</p>
                    </motion.div>
                </div>
            </section>

            {/* THE IDEA */}
            <section style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <motion.div 
                    style={{ 
                        position: 'absolute', 
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: 'url("https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2000&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        scale: bgScale,
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
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: '1.5rem 0' }}>Not all cleansing is visible.</h3>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-dark)', lineHeight: '1.6' }}>
                        What you carry through the day deserves to be washed away, entirely. 
                        <strong> 11:11 Ritualz</strong> helps you cleanse not just your body, but your energy.
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

            {/* Start Your Ritual & 11:11 */}
            <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative' }}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                    >
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Start Your Ritual</h2>
                        <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                            You don't need more time. You just need a moment that's yours.
                        </p>
                    </motion.div>

                    <div style={{ marginTop: '6rem', position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{
                                fontSize: 'clamp(5rem, 15vw, 12rem)',
                                fontFamily: 'var(--font-serif)',
                                color: 'rgba(212,175,55,0.1)',
                                position: 'absolute',
                                zIndex: 1,
                                fontWeight: 'bold'
                            }}
                        >
                            11:11
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--color-dark)',
                                letterSpacing: '4px'
                            }}
                        >
                            See you at <span style={{ color: 'var(--color-gold)' }}>11:11</span>
                        </motion.div>

                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{ 
                                duration: 4, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                            }}
                            style={{
                                position: 'absolute',
                                width: '300px',
                                height: '300px',
                                borderRadius: '50%',
                                border: '1px solid var(--color-gold)',
                                zIndex: 0
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RitualSection;
