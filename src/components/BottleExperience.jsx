import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
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

    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    React.useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') setIsMobile(window.innerWidth <= 768);
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Scale and subtle floating effect
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1.05, 1.05, 0.95]);
    const yFloat = useTransform(scrollYProgress, [0, 1], [0, -30]);

    const ingredients = [
        {
            img: saltImg, x: -260, y: -20, mobileX: -120, mobileY: -10, delay: 0.1, name: 'Sea Salt',
            benefits: "Absorbs negative energy and grounds the spirit. Mineral-rich crystals that detoxify both body and aura."
        },
        {
            img: rosemaryImg, x: 260, y: -20, mobileX: 120, mobileY: -10, delay: 0.2, name: 'Rosemary',
            benefits: "Supports mental clarity and spiritual protection. A potent herb for clearing psychic fog."
        },
        {
            img: lavenderImg, x: -280, y: 190, mobileX: -130, mobileY: 90, delay: 0.3, name: 'Lavender',
            benefits: "Heals emotional wounds and restores deep peace. Calms the nervous system for a restful reset."
        },
        {
            img: bayImg, x: 280, y: 190, mobileX: 130, mobileY: 90, delay: 0.4, name: 'Bay Leaves',
            benefits: "The leaf of success and purification. Used for centuries to manifest intentions and clear obstacles."
        },
        {
            img: cardamomImg, x: -180, y: -200, mobileX: -85, mobileY: -95, delay: 0.5, name: 'Cardamom',
            benefits: "Balances the heart and uplifts the mind. Provides emotional clarity and revitalizes the spirit."
        },
        {
            img: camphorImg, x: 180, y: -200, mobileX: 85, mobileY: -95, delay: 0.6, name: 'Camphor',
            benefits: "The ultimate reset. Pierces through stagnant energy to provide immediate spiritual refreshment."
        },
    ];

    return (
        <section style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-dark)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflowX: 'hidden',
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
                    font-size: 14vw;
                    font-family: var(--font-serif);
                    color: rgba(255, 255, 255, 0.05);
                    white-space: nowrap;
                    z-index: 1;
                    pointer-events: none;
                    font-weight: bold;
                }
                .bg-watermark-ritualz {
                    position: absolute;
                    bottom: 300px;
                    font-size: 14vw;
                    font-family: var(--font-serif);
                    color: rgba(0,0,0,0.5);
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
                    .bottle-container { width: 160px; height: 240px; }
                    .experience-title { font-size: 2rem; }
                    .bottle-ritual-wrapper { transform: none; height: 420px; margin-top: 120px; margin-bottom: 2rem; }
                    .ingredient-pop { width: 70px; }
                    .ingredient-img-container { width: 56px; height: 56px; padding: 5px; }
                    .ingredient-label { font-size: 0.55rem; letter-spacing: 1.5px; margin-top: 6px; }
                }
                @media (max-width: 480px) {
                    .bottle-container { width: 130px; height: 200px; }
                    .bottle-ritual-wrapper { height: 360px; margin-top: 100px; }
                    .ingredient-pop { width: 60px; }
                    .ingredient-img-container { width: 48px; height: 48px; padding: 4px; }
                    .ingredient-label { font-size: 0.5rem; letter-spacing: 1px; margin-top: 5px; }
                }
            `}</style>

            {/* <div className="bg-watermark">Ocean's Shield</div> */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="experience-title-container"
            >
                <p style={{ color: 'var(--color-gold)', letterSpacing: '6px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>
                    Ocean's Shield.
                </p>
                <h2 className="experience-title" style={{ marginBottom: '2rem', color: '#fff' }}>The Ocean in a Jar.</h2>
                <div style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Crafted to cleanse the energetic body, the field that lives just beyond your skin and carries everything your days bring.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Made with real herbs. Real salt. Specific mantras playing through every batch of production making it a Spiritual bath Ritual.
                    </p>
                    <p style={{ fontWeight: 600, color: '#fff' }}>
                        No essential oils. No machines. No shortcuts. Ever.
                    </p>
                </div>
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
                    const targetX = isMobile ? ing.mobileX : ing.x;
                    const targetY = isMobile ? ing.mobileY : ing.y;

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
                                x: targetX,
                                y: targetY,
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
                                    y: isMobile ? 10 : 0,
                                    x: isMobile ? 0 : (isLeftSide ? -20 : 20),
                                    scale: 0.9
                                }}
                                animate={{
                                    opacity: hoveredIndex === i ? 1 : 0,
                                    y: isMobile ? (hoveredIndex === i ? 0 : 10) : 0,
                                    x: isMobile ? 0 : (hoveredIndex === i ? 0 : (isLeftSide ? -20 : 20)),
                                    scale: hoveredIndex === i ? 1 : 0.9,
                                    pointerEvents: hoveredIndex === i ? 'auto' : 'none'
                                }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                style={isMobile ? {
                                    position: 'absolute',
                                    bottom: '110%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '140px',
                                    background: 'rgba(20, 20, 20, 0.98)',
                                    backdropFilter: 'blur(15px)',
                                    border: '1px solid var(--color-gold)',
                                    padding: '0.7rem',
                                    borderRadius: '12px',
                                    boxShadow: '0 15px 30px rgba(0,0,0,0.6)',
                                    textAlign: 'center',
                                    zIndex: 200,
                                    pointerEvents: 'none',
                                    color: '#fff'
                                } : {
                                    position: 'absolute',
                                    [isLeftSide ? 'left' : 'right']: '200%',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '180px',
                                    background: 'rgba(20, 20, 20, 0.98)',
                                    backdropFilter: 'blur(15px)',
                                    border: '1px solid var(--color-gold)',
                                    padding: '0.9rem',
                                    borderRadius: '16px',
                                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                                    textAlign: 'left',
                                    zIndex: 101,
                                    pointerEvents: 'none',
                                    color: '#fff'
                                }}
                            >
                                <h4 style={{
                                    fontFamily: 'var(--font-serif)',
                                    color: '#fff',
                                    fontSize: isMobile ? '0.7rem' : '0.95rem',
                                    marginBottom: '0.4rem',
                                    borderBottom: '1px solid rgba(212,175,55,0.3)',
                                    paddingBottom: '0.35rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isMobile ? 'center' : 'flex-start',
                                    gap: '6px'
                                }}>
                                    <span style={{ color: 'var(--color-gold)' }}>◆</span>
                                    {ing.name}
                                </h4>
                                <p style={{
                                    fontSize: isMobile ? '0.62rem' : '0.75rem',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.4,
                                    fontStyle: 'italic',
                                    fontWeight: '400',
                                    margin: 0
                                }}>
                                    {ing.benefits}
                                </p>
                                {!isMobile && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        [isLeftSide ? 'left' : 'right']: '-8px',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        width: '16px',
                                        height: '16px',
                                        background: 'rgba(20, 20, 20, 0.98)',
                                        borderLeft: isLeftSide ? '1px solid var(--color-gold)' : 'none',
                                        borderBottom: isLeftSide ? '1px solid var(--color-gold)' : 'none',
                                        borderRight: isLeftSide ? 'none' : '1px solid var(--color-gold)',
                                        borderTop: isLeftSide ? 'none' : '1px solid var(--color-gold)',
                                        zIndex: -1
                                    }} />
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginTop: '-10rem', zIndex: 10 }}
            >
                <Link to="/product/1" className="btn" style={{
                    padding: '1.2rem 3.5rem',
                    backgroundColor: '#fff',
                    color: 'var(--color-dark)',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '2px'
                }}>
                    START YOUR RITUAL
                </Link>
                <p style={{ marginTop: '2rem', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', maxWidth: '600px', margin: '2rem auto 0' }}>
                    You don't need more time. You just need a moment that's yours.
                </p>
            </motion.div>
        </section>
    );
};

export default BottleExperience;
