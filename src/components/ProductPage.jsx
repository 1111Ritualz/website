import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Star, Shield, Zap, Sparkles } from 'lucide-react';
import { products } from '../data';
import oc1 from '../assets/images/oc1.jpeg';
import oc2 from '../assets/images/oc2.jpeg';
import oc3 from '../assets/images/oc3.jpeg';
import ocvid from '../assets/videos/ocvid.mp4';

import ingSalt from '../assets/images/ingredient_sea_salt_1776526963161.png';
import ingBay from '../assets/images/ingredient_bay_leaves_1776527110544.png';
import ingRosemary from '../assets/images/ingredient_rosemary_1776527008835.png';
import ingLavender from '../assets/images/ingredient_lavender_1776527024326.png';
import ingCardamom from '../assets/images/ing_cardamom_1776527404764.png';
import ingCamphor from '../assets/images/cam.jpeg';

const ingredients = [
    { name: 'Unrefined Sea Salt', desc: 'Mineral-rich, deeply cleansing', icon: ingSalt },
    { name: 'Bay Leaves', desc: 'Known for purification', icon: ingBay },
    { name: 'Rosemary', desc: 'Supports clarity', icon: ingRosemary },
    { name: 'Lavender', desc: 'Calms the body and mind', icon: ingLavender },
    { name: 'Cardamom', desc: 'Balances and uplifts', icon: ingCardamom },
    { name: 'Camphor', desc: 'Deeply refreshing and resetting', icon: ingCamphor },
];
const steps = [
    { number: '01', label: 'Add', desc: "Two tablespoons to warm water.\nLet it open." },
    { number: '02', label: 'Pause', desc: "Allow it to dissolve.\nStay with the moment. Deep breathe three times." },
    { number: '03', label: 'Speak', desc: "Say the affirmations out loud.\nLet them land." },
    { number: '04', label: 'Pour', desc: "Slowly, from face downward.\nLet it move through you." },
    { number: '05', label: 'Emerge', desc: "Step out unhurried.\nGive it a moment to settle." },
    { number: '06', label: 'Listen', desc: "Listen to the silence.\nIt has much to say." }
];

const benefitsList = [
    'Mentally lighter at the end of the day',
    'Less overwhelmed by daily stress',
    'More present and calm',
    'Better rest and recovery',
];

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id)) || products[0];

    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const price = 1199;
    const totalAmount = price * quantity;

    const handleBuyNow = () => {
        /*
        const payload = { productId: product.id, productName: product.name, quantity, totalAmount };
        if (!user) {
            navigate('/signup', { state: { redirectTo: '/payment', payload } });
        } else {
            navigate('/payment', { state: { payload } });
        }
        */
        const phoneNumber = "919653390161"; // 91 for India code
        const message = `Hi, I am interested in buying ${quantity}x ${product.name} (Total: ₹${totalAmount.toLocaleString()}).`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-dark)', paddingTop: '80px' }}>
            <style>{`
                .product-main-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                    padding: 4rem 2rem;
                    max-width: 1300px;
                    margin: 0 auto;
                }
                .product-image-container {
                    position: relative;
                }
                .product-image-container img {
                    width: 100%;
                    border-radius: 4px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .product-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .price-tag {
                    font-size: 2rem;
                    font-family: var(--font-serif);
                    margin: 1.5rem 0;
                    color: var(--color-dark);
                }
                .action-buttons {
                    display: flex;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                .btn-primary {
                    background: var(--color-dark);
                    color: #fff;
                    padding: 1.2rem 2.5rem;
                    border: none;
                    font-family: var(--font-serif);
                    font-size: 1rem;
                    letter-spacing: 2px;
                    cursor: pointer;
                    transition: all 0.3s;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                }
                .btn-primary:hover {
                    background: #333;
                    transform: translateY(-2px);
                }
                .btn-secondary {
                    background: transparent;
                    color: var(--color-dark);
                    padding: 1.2rem 2.5rem;
                    border: 1px solid var(--color-dark);
                    font-family: var(--font-serif);
                    font-size: 1rem;
                    letter-spacing: 2px;
                    cursor: pointer;
                    transition: all 0.3s;
                    flex: 1;
                }
                .btn-secondary:hover {
                    background: var(--color-dark);
                    color: #fff;
                    transform: translateY(-2px);
                }
                
                .quantity-selector {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .quantity-btn {
                    width: 36px;
                    height: 36px;
                    border: 1px solid var(--color-dark);
                    background: transparent;
                    color: var(--color-dark);
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .quantity-btn:hover {
                    background: var(--color-dark);
                    color: white;
                }
                .quantity-value {
                    font-size: 1.2rem;
                    font-weight: bold;
                    min-width: 30px;
                    text-align: center;
                }
                
                /* Narrative Section Overrides */
                .narrative-ingredients-grid {
                    display: grid; 
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px; 
                    background-color: rgba(212,175,55,0.2);
                    border: 1px solid rgba(212,175,55,0.2);
                }
                .narrative-steps-grid { 
                    display: grid; 
                    grid-template-columns: repeat(5, 1fr); 
                    gap: 1.5rem; 
                }
                .narrative-video-section { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    min-height: 500px; 
                }
                .narrative-benefits-grid { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 4rem; 
                    align-items: center; 
                }
                .narrative-coastal-grid { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 4rem; 
                    align-items: center; 
                }

                @media (max-width: 968px) {
                    .product-main-grid { grid-template-columns: 1fr; gap: 2rem; padding: 2rem 1.5rem; }
                    .narrative-ingredients-grid { grid-template-columns: 1fr 1fr; }
                    .narrative-steps-grid { grid-template-columns: 1fr 1fr; }
                    .narrative-video-section { grid-template-columns: 1fr; }
                    .narrative-benefits-grid { grid-template-columns: 1fr; }
                    .narrative-coastal-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 580px) {
                    .narrative-ingredients-grid { grid-template-columns: 1fr; }
                    .narrative-steps-grid { grid-template-columns: 1fr; }
                    .action-buttons { flex-direction: column; }
                }
            `}</style>

            {/* Main Product Section */}
            <section className="product-main-grid">
                <motion.div
                    className="product-image-container"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={product.image} alt={product.name} />
                </motion.div>

                <motion.div
                    className="product-info"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        {product.category}
                    </p>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                        {product.name}
                    </h1>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-light)', marginBottom: '0rem' }}>
                        Bathe in the tide of protection, Let your aura shine.
                    </p>
                    <div className="price-tag">₹ {price.toLocaleString()}</div>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                        Crafted with sea-kissed sea and protective herbs, who’s blend helps wash away negativity and creates a calming shield around your energy.
                    </p>

                    <div className="quantity-selector">
                        <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <span className="quantity-value">{quantity}</span>
                        <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Total: ₹ {totalAmount.toLocaleString()}</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={18} color="var(--color-gold)" />
                            <span style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>NATURAL SCENT</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap size={18} color="var(--color-gold)" />
                            <span style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>NO SYNTHETIC FRAGRANCE OILS</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={18} color="var(--color-gold)" />
                            <span style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>NATURAL INGREDIENTS</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={18} color="var(--color-gold)" />
                            <span style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>HANDMADE</span>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-primary" onClick={handleBuyNow}>BUY NOW</button>
                    </div>
                </motion.div>
            </section>

            {/* ── DAILY RESET / INGREDIENTS (Animated) ── */}
            <section style={{ backgroundColor: 'var(--color-dark)', padding: '8rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            Ocean's Shield
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1.5rem' }}>
                            Your Daily Reset
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            End the day clean. Completely. Each ingredient is a key to unlocking a different layer of your release.
                        </p>
                    </motion.div>

                    <motion.div
                        className="narrative-ingredients-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        {ingredients.map((ing) => (
                            <motion.div
                                key={ing.name}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                style={{
                                    padding: '3rem 2rem', textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    border: '1px solid rgba(212,175,55,0.1)',
                                    transition: 'all 0.3s',
                                }}
                            >
                                <motion.div
                                    style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img
                                        src={ing.icon}
                                        alt={ing.name}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            border: '2px solid rgba(212,175,55,0.3)',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                        }}
                                    />
                                </motion.div>
                                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.3rem', marginBottom: '0.8rem' }}>
                                    {ing.name}
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {ing.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── SEE IT IN ACTION (Video) ── */}
            <section className="narrative-video-section">
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
                    <video
                        src={ocvid}
                        autoPlay loop muted playsInline
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div style={{
                    backgroundColor: 'var(--color-dark)',
                    padding: '4rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Experience
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 3rem)', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                            See it in Action
                        </h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'rgba(255,255,255,0.7)' }}>
                            Watch how Ocean's Shield dissolves into your water, releasing its cleansing energy. A simple moment of pause that becomes a daily ritual of reset.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── BENEFITS ── */}
            <section style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="narrative-benefits-grid">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            With Consistent Use
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', marginBottom: '2rem', lineHeight: 1.2 }}>
                            What You'll Notice Over Time
                        </h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {benefitsList.map((b, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1.5rem',
                                        padding: '1.2rem 0', borderBottom: '1px solid rgba(212,175,55,0.2)',
                                        fontSize: '1.1rem', color: 'var(--color-text-light)'
                                    }}>
                                    <span style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        border: '1px solid var(--color-gold)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0, color: 'var(--color-gold)', fontSize: '0.8rem'
                                    }}>✦</span>
                                    {b}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        style={{ position: 'relative' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img src={oc2} alt="Ocean's Shield Product" style={{
                            width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px',
                        }} />
                    </motion.div>
                </div>
            </section>

            {/* ── THE PRACTICE ── */}
            <section style={{ backgroundColor: 'var(--color-dark)', padding: '8rem 2rem' }}>
                <style>{`
                    .method-cards-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                        margin-bottom: 6rem;
                    }
                    .ritual-steps-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 1.5rem;
                    }
                    @media (max-width: 968px) {
                        .ritual-steps-grid {
                            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        }
                    }
                    @media (max-width: 768px) {
                        .method-cards-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: '#fff', marginBottom: '2rem' }}>
                            THE PRACTICE
                        </h2>
                        <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                            <p>Three minutes.</p>
                            <p>Every morning.</p>
                            <p>That is all the ritual asks.</p>
                        </div>
                    </motion.div>

                    {/* Method Cards */}
                    <motion.div
                        className="method-cards-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeInUp}
                            style={{ padding: '3rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '4px' }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>The Bucket</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                                2 tablespoons dissolved in warm water. After your shower, pour slowly from face to toe. This is the traditional method. This is how it was done for centuries before showers existed.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            style={{ padding: '3rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '4px' }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>The Mug</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                                1 tablespoon in a mug of warm water. Pour at the end of your shower. Every single day.
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#fff' }}>
                            The Ritual
                        </h2>
                    </motion.div>

                    <motion.div
                        className="ritual-steps-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {steps.map((step) => (
                            <motion.div
                                key={step.number}
                                variants={fadeInUp}
                                style={{
                                    padding: '3rem 1.5rem',
                                    backgroundColor: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(212,175,55,0.1)',
                                    textAlign: 'center', transition: 'all 0.3s',
                                    display: 'flex', flexDirection: 'column', height: '100%'
                                }}
                                whileHover={{ borderColor: 'var(--color-gold)', transform: 'translateY(-5px)' }}
                            >
                                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'rgba(212,175,55,0.2)', marginBottom: '1rem' }}>
                                    {step.number}
                                </p>
                                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                                    {step.label}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* ── THE ORIGIN ── */}
            <section style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="narrative-coastal-grid">
                    <motion.div
                        style={{ position: 'relative' }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src={oc3} alt="Coastal ritual" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '4px' }} />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '3px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            The Origin
                        </p>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3vw, 3.5rem)', marginBottom: '2rem', lineHeight: 1.2 }}>
                            Inspired by a Simple Coastal Ritual
                        </h2>
                        <div style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p>Along the Konkan coast, there's a simple belief… if something feels wrong, go to the ocean.</p>
                            <p>Let the water take it away.</p>
                            <p>Years later, that idea returned. What began as a simple blend of salts at home became a daily ritual for both Shantana and Rakshit.</p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-dark)', marginTop: '1rem' }}>
                                Now, it's yours.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
