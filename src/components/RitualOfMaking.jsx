import React from 'react';
import { motion } from 'framer-motion';
import makingImg from '../assets/images/maker.jpeg';

const RitualOfMaking = () => {
    return (
        <section style={{ backgroundColor: 'var(--color-dark)', color: '#fff', padding: '8rem 0' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '5rem',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '2rem', lineHeight: 1.2 }}>
                            The Ritual of Making
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8 }}>
                            <p>
                                1. We make it the way it was always meant to be made.
                            </p>
                            <p>
                                2. Before anything begins, the space is cleansed energetically with sage. The intention starts before the hands do.
                            </p>
                            <p>
                                3. A mantra is chosen for each batch and played throughout. The salt, the herbs, and the hands sit in that sound.

                            </p>
                            <p>
                                4. Everything is hand pounded. Slowly. Intentionally. We use whole ingredients only. Real herbs (no essential oils). Real salt.

                            </p>
                            <p>
                                5. Ohhh and you have to see it and smell it to witness the magic.

                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <img
                            src={makingImg}
                            alt="The Ritual of Making"
                            style={{
                                width: '100%',
                                aspectRatio: '4/5',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                            }}
                        />
                        <div style={{
                            position: 'absolute', top: '-1.5rem', left: '-1.5rem',
                            width: '150px', height: '150px',
                            border: '2px solid var(--color-gold)',
                            borderRadius: '4px', zIndex: -1,
                            opacity: 0.3
                        }} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RitualOfMaking;
