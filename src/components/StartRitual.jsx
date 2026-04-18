import React from 'react';
import { motion } from 'framer-motion';

const StartRitual = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', backgroundColor: 'var(--color-cream)' }}>
            <div className="container">
                <div style={{ marginTop: '2rem', position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
    );
};

export default StartRitual;
