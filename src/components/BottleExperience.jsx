import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import bottleImg from '../assets/images/oc2.jpeg';
import saltImg from '../assets/images/ingredient_sea_salt_1776526963161.png';
import rosemaryImg from '../assets/images/ingredient_rosemary_1776527008835.png';
import lavenderImg from '../assets/images/ingredient_lavender_1776527024326.png';
import bayImg from '../assets/images/ingredient_bay_leaves_1776527110544.png';
import cardamomImg from '../assets/images/ing_cardamom_1776527404764.png';
import camphorImg from '../assets/images/cam.jpeg';

const BottleExperience = () => {
    const { scrollYProgress } = useScroll();
    const [hoveredIndex, setHoveredIndex] = React.useState(null);

    // Scale and subtle floating effect
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1.05, 1.05, 0.95]);
    const yFloat = useTransform(scrollYProgress, [0, 1], [0, -30]);

    const ingredients = [
        {
            img: saltImg, x: -260, y: -20, delay: 0.1, name: 'Sea Salt',
            benefits: "Absorbs negative energy and grounds the spirit. Mineral-rich crystals that detoxify both body and aura."
        },
        {
            img: rosemaryImg, x: 260, y: -20, delay: 0.2, name: 'Rosemary',
            benefits: "Supports mental clarity and spiritual protection. A potent herb for clearing psychic fog."
        },
        {
            img: lavenderImg, x: -280, y: 190, delay: 0.3, name: 'Lavender',
            benefits: "Heals emotional wounds and restores deep peace. Calms the nervous system for a restful reset."
        },
        {
            img: bayImg, x: 280, y: 190, delay: 0.4, name: 'Bay Leaves',
            benefits: "The leaf of success and purification. Used for centuries to manifest intentions and clear obstacles."
        },
        {
            img: cardamomImg, x: -180, y: -200, delay: 0.5, name: 'Cardamom',
            benefits: "Balances the heart and uplifts the mind. Provides emotional clarity and revitalizes the spirit."
        },
        {
            img: camphorImg, x: 180, y: -200, delay: 0.6, name: 'Camphor',
            benefits: "The ultimate reset. Pierces through stagnant energy to provide immediate spiritual refreshment."
        },
    ];

    return (
        <section style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-cream)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '4rem 2rem 2rem'
        }}>
            <style>{`
                .experience-title-container {
                    text-align: center;
                    margin-bottom: 2rem;
                    z-index: 10;
                    position: relative;
                }
                .experience-title {
                    font-family: var(--font-serif);
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    color: var(--color-dark);
                    line-height: 1.1;
                    margin: 0;
                }
                .bottle-ritual-wrapper {
                    position: relative;
                    margin-top: 200px;
                    width: 100%;
                    max-width: 1200px;
                    height: 600px;
                    display: flex;
                    justify-content: center;
                    alignItems: center;
                }
                .bottle-container {
                    margin-top: 00px;
                    position: relative;
                    width: 340px;
                    height: 500px;
                    z-index: 5;
                }
                .bottle-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 12px;
                    /* Applying multiply blend mode to hide white background from the JPEG */
                    mix-blend-mode: multiply;
                }
                .ingredient-pop {
                    position: absolute;
                    width: 160px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 6;
                }
                .ingredient-img-container {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: #fff;
                    padding: 8px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.08);
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(212,175,55,0.2);
                    transition: all 0.5s ease;
                }
                .ingredient-pop:hover .ingredient-img-container {
                    transform: translateY(-10px) scale(1.05);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.12);
                    border-color: var(--color-gold);
                }
                .ingredient-pop img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .ingredient-label {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin-top: 15px;
                    color: var(--color-gold);
                    font-weight: 700;
                }
                .bg-watermark {
                    position: absolute;
                    bottom: 300px;
                    font-size: 16vw;
                    font-family: var(--font-serif);
                    color: rgba(0,0,0,0.015);
                    white-space: nowrap;
                    z-index: 1;
                    pointer-events: none;
                    font-weight: bold;
                }
                @media (max-width: 1200px) {
                    .bottle-ritual-wrapper { transform: scale(0.85); height: 500px; margin-top: 100px; }
                }
                @media (max-width: 1024px) {
                    .bottle-ritual-wrapper { transform: scale(0.75); height: 450px; }
                    .ingredient-pop { width: 120px; }
                    .ingredient-img-container { width: 90px; height: 90px; }
                }
                @media (max-width: 768px) {
                    .bottle-container { width: 200px; height: 300px; }
                    .experience-title { font-size: 2rem; }
                    .bottle-ritual-wrapper { transform: scale(0.6); height: 400px; margin-top: 50px; }
                }
            `}</style>

            <div className="bg-watermark">11:11 RITUALZ</div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="experience-title-container"
            >
                <p style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>
                    The Composition
                </p>
                <h2 className="experience-title">The Alchemy of Ocean's Shield</h2>
            </motion.div>

            <div className="bottle-ritual-wrapper">
                <motion.div
                    className="bottle-container"
                    style={{ scale, y: yFloat }}
                >
                    <img src={bottleImg} alt="Ocean's Shield" className="bottle-image" />
                </motion.div>

                {ingredients.map((ing, i) => {
                    const isLeftSide = ['Sea Salt', 'Lavender', 'Cardamom'].includes(ing.name);

                    return (
                        <motion.div
                            key={i}
                            className="ingredient-pop"
                            style={{
                                cursor: 'pointer',
                                zIndex: hoveredIndex === i ? 100 : 6
                            }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                            whileInView={{
                                opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1,
                                scale: hoveredIndex === i ? 1.1 : 1,
                                x: ing.x,
                                y: ing.y,
                                transition: {
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 },
                                    x: { delay: ing.delay, type: 'spring', stiffness: 40, damping: 12 },
                                    y: { delay: ing.delay, type: 'spring', stiffness: 40, damping: 12 }
                                }
                            }}
                            animate={{
                                opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1,
                                scale: hoveredIndex === i ? 1.1 : 1,
                            }}
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            <div className="ingredient-img-container" style={{ position: 'relative' }}>
                                <img src={ing.img} alt={ing.name} />
                            </div>
                            <span className="ingredient-label">{ing.name}</span>

                            {/* Hover Benefits Window */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: isLeftSide ? 20 : -20,
                                    scale: 0.9
                                }}
                                animate={{
                                    opacity: hoveredIndex === i ? 1 : 0,
                                    x: hoveredIndex === i ? 0 : (isLeftSide ? 20 : -20),
                                    scale: hoveredIndex === i ? 1 : 0.9,
                                    pointerEvents: hoveredIndex === i ? 'auto' : 'none'
                                }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                style={{
                                    position: 'absolute',
                                    [isLeftSide ? 'right' : 'left']: '120%',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '260px',
                                    background: 'rgba(255, 255, 255, 0.98)',
                                    backdropFilter: 'blur(15px)',
                                    border: '1px solid var(--color-gold)',
                                    padding: '1.5rem',
                                    borderRadius: '16px',
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                                    textAlign: 'left',
                                    zIndex: 101,
                                    pointerEvents: 'none'
                                }}
                            >
                                <h4 style={{
                                    fontFamily: 'var(--font-serif)',
                                    color: 'var(--color-dark)',
                                    fontSize: '1.2rem',
                                    marginBottom: '0.8rem',
                                    borderBottom: '1px solid rgba(212,175,55,0.3)',
                                    paddingBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <span style={{ color: 'var(--color-gold)' }}>◆</span>
                                    {ing.name}
                                </h4>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--color-text-light)',
                                    lineHeight: 1.6,
                                    fontStyle: 'italic',
                                    fontWeight: '400'
                                }}>
                                    {ing.benefits}
                                </p>
                                {/* Arrow/Triangle */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    [isLeftSide ? 'right' : 'left']: '-8px',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    width: '16px',
                                    height: '16px',
                                    background: 'white',
                                    borderLeft: isLeftSide ? 'none' : '1px solid var(--color-gold)',
                                    borderBottom: isLeftSide ? 'none' : '1px solid var(--color-gold)',
                                    borderRight: isLeftSide ? '1px solid var(--color-gold)' : 'none',
                                    borderTop: isLeftSide ? '1px solid var(--color-gold)' : 'none',
                                    zIndex: -1
                                }} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default BottleExperience;
