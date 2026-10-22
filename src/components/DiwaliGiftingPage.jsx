import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart, Check, Tag, ArrowRight, X, Clock, Star, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { validateCoupon } from '../utils/discountUtils';
import goldenlight from '../assets/images/goldenlight.jpeg';

const PRE_ORDER_DEADLINE = new Date('2026-10-29T23:59:59+05:30');

const DiwaliGiftingPage = () => {
    const navigate = useNavigate();

    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [senderName, setSenderName] = useState('');
    const [personalNote, setPersonalNote] = useState('Wishing you a luminous Diwali filled with light, abundance and new beginnings. ✨🪔');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const diff = PRE_ORDER_DEADLINE - now;
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const price = 999;
    const discountAmount = appliedCoupon ? Math.round(price * appliedCoupon.discountRate) : 0;
    const totalAmount = price - discountAmount;

    const handleApplyCoupon = (e) => {
        e?.preventDefault();
        const res = validateCoupon(couponInput);
        if (res.valid) {
            setAppliedCoupon(res);
            setCouponError('');
        } else {
            setAppliedCoupon(null);
            setCouponError(res.message);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput('');
        setCouponError('');
    };

    const handleOrderNow = () => {
        const giftDetails = recipientName || senderName
            ? ` (Gift for ${recipientName || 'Loved One'} from ${senderName || 'You'})`
            : '';
        const payload = {
            productId: 'golden-light',
            productName: `Golden Light – Diwali Ritual Bath Salt${giftDetails}`,
            quantity: 1,
            subtotal: price,
            discountCode: appliedCoupon?.code || '',
            discountAmount,
            totalAmount,
            giftMessage: { recipientName, senderName, personalNote }
        };
        navigate('/payment', { state: { payload } });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
    };

    const pad = (n) => String(n).padStart(2, '0');

    const ingredients = [
        { name: 'Himalayan Pink Salt', emoji: '🪨', desc: 'Hand-pounded, mineral-rich, deeply purifying' },
        { name: 'Rose Petals', emoji: '🌹', desc: 'Softens skin, invites love and warmth' },
        { name: 'Saffron', emoji: '✨', desc: 'The golden thread — luxury and light' },
        { name: 'Bay Leaves', emoji: '🌿', desc: 'Ancient herb of clarity and intention' },
        { name: 'Cloves', emoji: '🔸', desc: 'Warming, grounding, protective energy' },
        { name: 'Cinnamon', emoji: '🍂', desc: 'Abundance, prosperity, new beginnings' },
    ];

    return (
        <div style={{ backgroundColor: '#0d0500', color: '#fff', minHeight: '100vh' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

                .gl-hero {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 140px 1.5rem 6rem;
                    position: relative;
                    overflow: hidden;
                    background: radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.28) 0%, rgba(13,5,0,1) 65%);
                }
                .gl-hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a017' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    pointer-events: none;
                }
                .gl-sparkle {
                    display: inline-block;
                    animation: sparklePulse 2.2s ease-in-out infinite alternate;
                }
                @keyframes sparklePulse {
                    0%   { transform: scale(1) rotate(0deg); opacity: 0.8; filter: drop-shadow(0 0 8px #f5c842); }
                    100% { transform: scale(1.18) rotate(8deg); opacity: 1;   filter: drop-shadow(0 0 22px #f5c842); }
                }
                .gl-flame {
                    display: inline-block;
                    animation: flameDance 1.8s ease-in-out infinite alternate;
                }
                @keyframes flameDance {
                    0%   { transform: scaleY(1) rotate(-2deg); }
                    100% { transform: scaleY(1.1) rotate(2deg); }
                }
                .gl-badge-urgent {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #8b1a1a, #c0392b);
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    padding: 0.5rem 1.5rem;
                    border-radius: 30px;
                    margin-bottom: 1.5rem;
                    box-shadow: 0 4px 20px rgba(192,57,43,0.4);
                    animation: urgentPulse 2s ease-in-out infinite;
                }
                @keyframes urgentPulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(192,57,43,0.4); }
                    50%       { box-shadow: 0 4px 35px rgba(192,57,43,0.7); }
                }
                .gl-countdown-wrapper {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    margin: 2rem 0 2.5rem;
                    flex-wrap: wrap;
                }
                .gl-countdown-unit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 70px;
                }
                .gl-countdown-num {
                    font-family: 'Playfair Display', var(--font-serif);
                    font-size: 2.8rem;
                    font-weight: 700;
                    color: var(--color-gold);
                    line-height: 1;
                    background: rgba(212,175,55,0.1);
                    border: 1px solid rgba(212,175,55,0.3);
                    border-radius: 8px;
                    padding: 0.6rem 1rem;
                    min-width: 72px;
                    text-align: center;
                }
                .gl-countdown-label {
                    font-size: 0.65rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.5);
                    margin-top: 0.4rem;
                }
                .gl-divider {
                    width: 60px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
                    margin: 1.5rem auto;
                }
                .gl-section {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 6rem 2rem;
                }
                .gl-product-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 5rem;
                    align-items: start;
                }
                .gl-product-image-wrap {
                    position: sticky;
                    top: 120px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,160,23,0.15);
                }
                .gl-product-image-wrap img {
                    width: 100%;
                    display: block;
                    transition: transform 0.6s ease;
                }
                .gl-product-image-wrap:hover img { transform: scale(1.03); }
                .gl-ingredients-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1px;
                    background: rgba(212,175,55,0.15);
                    border: 1px solid rgba(212,175,55,0.15);
                    border-radius: 8px;
                    overflow: hidden;
                    margin: 3rem 0;
                }
                .gl-ingredient-cell {
                    background: rgba(255,255,255,0.02);
                    padding: 2rem 1.5rem;
                    text-align: center;
                    transition: background 0.3s;
                }
                .gl-ingredient-cell:hover { background: rgba(212,175,55,0.07); }
                .gl-affirmation-block {
                    background: linear-gradient(135deg, rgba(212,160,23,0.1), rgba(180,60,20,0.08));
                    border: 1px solid rgba(212,175,55,0.3);
                    border-radius: 12px;
                    padding: 3rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .gl-affirmation-block::before {
                    content: '"';
                    position: absolute;
                    top: -20px; left: 20px;
                    font-size: 10rem;
                    color: rgba(212,175,55,0.07);
                    font-family: 'Playfair Display', serif;
                    line-height: 1;
                    pointer-events: none;
                }
                .gl-cta-section {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(212,175,55,0.3);
                    border-radius: 16px;
                    padding: 3rem 2.5rem;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    max-width: 900px;
                    margin: 0 auto;
                }
                .gl-input {
                    width: 100%;
                    padding: 0.85rem 1rem;
                    background: rgba(0,0,0,0.4);
                    border: 1px solid rgba(212,175,55,0.3);
                    border-radius: 8px;
                    color: #fff;
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s;
                    box-sizing: border-box;
                }
                .gl-input:focus { border-color: var(--color-gold); }
                .gl-detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    font-size: 0.95rem;
                }
                .gl-detail-row:last-child { border-bottom: none; }
                .gl-buy-btn {
                    background: linear-gradient(135deg, #c8960c, #f5d16e, #c8960c);
                    background-size: 200% auto;
                    color: #1a0a00;
                    border: none;
                    padding: 1.3rem 3.5rem;
                    border-radius: 8px;
                    font-family: var(--font-serif);
                    font-size: 1.1rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    width: 100%;
                    transition: background-position 0.4s, transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 6px 30px rgba(200,150,12,0.35);
                }
                .gl-buy-btn:hover {
                    background-position: right center;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 40px rgba(200,150,12,0.5);
                }
                .gl-ps-block {
                    background: rgba(212,175,55,0.06);
                    border-left: 3px solid var(--color-gold);
                    padding: 1.5rem 2rem;
                    border-radius: 0 8px 8px 0;
                    font-style: italic;
                    color: rgba(255,255,255,0.75);
                    line-height: 1.8;
                    font-size: 0.95rem;
                    margin: 2.5rem 0;
                }
                @media (max-width: 860px) {
                    .gl-product-layout { grid-template-columns: 1fr; gap: 3rem; }
                    .gl-product-image-wrap { position: static; }
                    .gl-ingredients-grid { grid-template-columns: repeat(2, 1fr); }
                    .gl-cta-section { padding: 2rem 1.2rem; }
                }
                @media (max-width: 520px) {
                    .gl-ingredients-grid { grid-template-columns: 1fr; }
                    .gl-countdown-num { font-size: 2rem; min-width: 56px; padding: 0.5rem 0.7rem; }
                }
            `}</style>

            {/* ── HERO ── */}
            <header className="gl-hero">
                <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="gl-badge-urgent">
                        <Clock size={13} /> Limited Time Offer — Pre-orders Close 29 Oct
                    </div>

                    <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                        <span className="gl-flame">🪔</span>
                        <span className="gl-sparkle" style={{ margin: '0 0.5rem' }}>✨</span>
                        <span className="gl-flame">🪔</span>
                    </div>

                    <p style={{ color: 'var(--color-gold)', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
                        A Diwali Ritual for Abundance and New Beginnings
                    </p>

                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                        lineHeight: 1.05,
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, #f5c842 0%, #ffe066 40%, #d4a017 80%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        GOLDEN LIGHT
                    </h1>

                    <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '620px', margin: '0 auto 0.8rem', fontSize: '1.15rem', lineHeight: 1.8 }}>
                        Welcome the light. Make space for what's next.
                    </p>

                    <div className="gl-divider" />

                    {/* Countdown */}
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Pre-orders close in
                    </p>
                    <div className="gl-countdown-wrapper">
                        {[
                            { val: timeLeft.days, label: 'Days' },
                            { val: timeLeft.hours, label: 'Hours' },
                            { val: timeLeft.minutes, label: 'Minutes' },
                            { val: timeLeft.seconds, label: 'Seconds' },
                        ].map(({ val, label }) => (
                            <div key={label} className="gl-countdown-unit">
                                <span className="gl-countdown-num">{pad(val)}</span>
                                <span className="gl-countdown-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    <motion.a
                        href="#order"
                        whileHover={{ scale: 1.04 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                            background: 'linear-gradient(135deg, #c8960c, #f5d16e)',
                            color: '#1a0a00', fontWeight: '800',
                            padding: '1rem 2.5rem', borderRadius: '8px',
                            fontSize: '0.95rem', letterSpacing: '2px', textTransform: 'uppercase',
                            textDecoration: 'none',
                            boxShadow: '0 6px 30px rgba(200,150,12,0.35)'
                        }}
                    >
                        Pre-Order Now — ₹999 <ArrowRight size={16} />
                    </motion.a>
                </motion.div>
            </header>

            {/* ── PRODUCT SECTION ── */}
            <section style={{ backgroundColor: '#110804', padding: '7rem 2rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="gl-product-layout">

                        {/* Image */}
                        <motion.div
                            className="gl-product-image-wrap"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                        >
                            <img src={goldenlight} alt="Golden Light Diwali Ritual Bath Salt" />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                Limited-Edition · Diwali 2026
                            </p>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                                A Bathing Ritual<br />
                                <span style={{ color: 'var(--color-gold)' }}>for Abundance</span>
                            </h2>

                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
                                Inspired by the spirit of Diwali, Golden Light is a limited-edition bathing ritual created to celebrate abundance, invite new possibilities, and honour the person you're becoming.
                            </p>

                            {/* Ingredients */}
                            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                                The Blend
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                Hand-pounded Himalayan pink salt, rose petals, saffron, bay leaves, cloves and cinnamon — thoughtfully crafted together.
                            </p>

                            <div className="gl-ingredients-grid">
                                {ingredients.map((ing) => (
                                    <div key={ing.name} className="gl-ingredient-cell">
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ing.emoji}</div>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{ing.name}</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.5 }}>{ing.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Affirmation */}
                            <div className="gl-affirmation-block">
                                <Sparkles size={20} color="var(--color-gold)" style={{ marginBottom: '1rem' }} />
                                <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                    Your Golden Light Affirmation
                                </p>
                                <p style={{
                                    fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                                    color: '#fff', lineHeight: 1.7, fontStyle: 'italic'
                                }}>
                                    "I welcome light, abundance, new possibilities, and the courage to grow into the life I envision."
                                </p>
                                <div className="gl-divider" style={{ marginTop: '1.5rem' }} />
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>
                                    Let this be your moment to pause, set an intention, and welcome the new beginnings you wish to create.
                                </p>
                            </div>

                            {/* PS Block */}
                            <div className="gl-ps-block">
                                <strong style={{ color: 'var(--color-gold)', fontStyle: 'normal' }}>PS</strong> — Can be used with your <em>'pahili anghol'</em> as called in Maharashtra, or <em>'abhyanga snana'</em> as called in the south, which is usually celebrated on <strong>Narakchaturdashi</strong>. 🪔
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── GIFT OF LIGHT ── */}
            <section style={{ background: 'radial-gradient(ellipse at center, rgba(180,100,10,0.15) 0%, rgba(13,5,0,1) 70%)', padding: '7rem 2rem', textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    style={{ maxWidth: '700px', margin: '0 auto' }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎁</div>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        A Gift of Light
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', lineHeight: 1.2 }}>
                        For Someone You Love,<br />
                        <span style={{ color: 'var(--color-gold)' }}>or a Little Something for Yourself</span>
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                        Golden Light is an invitation to slow down, reconnect with yourself, and step into the festive season with intention.
                    </p>
                    <p style={{
                        fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-gold)',
                        fontStyle: 'italic', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '1.5rem'
                    }}>
                        Because you deserve to be on your own gifting list, too.
                    </p>
                </motion.div>
            </section>

            {/* ── PRODUCT DETAILS ── */}
            <section style={{ backgroundColor: '#110804', padding: '5rem 2rem' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    style={{ maxWidth: '700px', margin: '0 auto' }}
                >
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-gold)', marginBottom: '2rem', textAlign: 'center', letterSpacing: '2px' }}>
                        Product Details
                    </h2>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '2rem', marginBottom: '3rem' }}>
                        {[
                            { label: 'Weight', value: '150 g' },
                            { label: 'Price', value: '₹999' },
                            { label: 'Availability', value: 'Limited-edition Diwali special' },
                            { label: 'Pre-orders close', value: '29 October 2026', highlight: true },
                        ].map(({ label, value, highlight }) => (
                            <div key={label} className="gl-detail-row">
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</span>
                                <span style={{ color: highlight ? '#e74c3c' : '#fff', fontWeight: highlight ? '700' : '400', fontSize: '0.95rem' }}>
                                    {highlight && '🕯 '}{value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                        This Diwali, make space for your next chapter.
                    </p>
                </motion.div>
            </section>

            {/* ── ORDER SECTION ── */}
            <section id="order" style={{ padding: '6rem 2rem', backgroundColor: '#0d0500' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="gl-badge-urgent" style={{ display: 'inline-flex' }}>
                            <Clock size={13} /> Only available until 29 October 2026
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '0.5rem' }}>
                            Pre-Order <span style={{ color: 'var(--color-gold)' }}>Golden Light</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                            Complete your details and we'll prepare your ritual with care.
                        </p>
                    </div>

                    <div className="gl-cta-section">
                        {/* Gift Note Fields */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
                                <Gift size={18} color="var(--color-gold)" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-gold)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                    Gifting Someone? Add a Personal Note
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Recipient Name</label>
                                    <input
                                        type="text"
                                        className="gl-input"
                                        placeholder="e.g. Priya & Family"
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>From</label>
                                    <input
                                        type="text"
                                        className="gl-input"
                                        placeholder="Your name"
                                        value={senderName}
                                        onChange={(e) => setSenderName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Message on Card (optional)</label>
                                <textarea
                                    rows="3"
                                    className="gl-input"
                                    value={personalNote}
                                    onChange={(e) => setPersonalNote(e.target.value)}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                        </div>

                        {/* Coupon */}
                        <div style={{
                            marginBottom: '2rem', padding: '1.2rem',
                            backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '8px',
                            border: '1px solid rgba(212,175,55,0.2)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                                <Tag size={16} color="var(--color-gold)" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-gold)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    Festive Coupon Code
                                </span>
                            </div>

                            {!appliedCoupon ? (
                                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.8rem' }}>
                                    <input
                                        type="text"
                                        className="gl-input"
                                        placeholder="Enter coupon code"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                        style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            background: 'var(--color-gold)', color: '#1a0a00', border: 'none',
                                            padding: '0.75rem 1.8rem', borderRadius: '8px', cursor: 'pointer',
                                            fontWeight: '800', letterSpacing: '1px', fontSize: '0.85rem', flexShrink: 0
                                        }}
                                    >
                                        APPLY
                                    </button>
                                </form>
                            ) : (
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    background: 'rgba(212,175,55,0.1)', border: '1px solid var(--color-gold)',
                                    padding: '0.75rem 1rem', borderRadius: '8px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.95rem' }}>
                                        <Check size={16} color="var(--color-gold)" />
                                        <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                                    </div>
                                    <button onClick={handleRemoveCoupon} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>
                                        <X size={18} />
                                    </button>
                                </div>
                            )}
                            {couponError && (
                                <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.5rem' }}>{couponError}</p>
                            )}
                        </div>

                        {/* Price & CTA */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 0.3rem' }}>Golden Light · 150g · Limited-Edition</p>
                                    {appliedCoupon && (
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: '0 0 0.2rem' }}>
                                            Was: <span style={{ textDecoration: 'line-through' }}>₹{price.toLocaleString()}</span>
                                            <span style={{ color: '#2ecc71', marginLeft: '0.5rem', fontWeight: '700' }}>
                                                − ₹{discountAmount.toLocaleString()}
                                            </span>
                                        </p>
                                    )}
                                    <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
                                        ₹ {totalAmount.toLocaleString()}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                                    <span>🌿 Natural</span>
                                    <span>🤲 Handcrafted</span>
                                    <span>📦 150g</span>
                                </div>
                            </div>

                            <button className="gl-buy-btn" onClick={handleOrderNow}>
                                PRE-ORDER GOLDEN LIGHT <ArrowRight size={20} />
                            </button>

                            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '1rem', letterSpacing: '0.5px' }}>
                                🕯 Limited-edition · Pre-orders close 29 October 2026
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default DiwaliGiftingPage;
