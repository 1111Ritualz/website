import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Tag, Shield, Heart, ArrowRight, X, Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { validateCoupon } from '../utils/discountUtils';

import ingSalt from '../assets/images/ingredient_sea_salt_1776526963161.png';
import ingBay from '../assets/images/ingredient_bay_leaves_1776527110544.png';
import ingRosemary from '../assets/images/ingredient_rosemary_1776527008835.png';
import ingLavender from '../assets/images/ingredient_lavender_1776527024326.png';
import ingCardamom from '../assets/images/ing_cardamom_1776527404764.png';
import ingCamphor from '../assets/images/cam.jpeg';

const BASE_SALTS = [
    { id: 'konkan', name: 'Konkan Sea Salt', desc: 'Raw ocean salt for aura purification & tide reset', icon: ingSalt },
    { id: 'pink', name: 'Pink Himalayan Salt', desc: '84 trace minerals for deep physical grounding', icon: ingSalt },
    { id: 'deadsea', name: 'Dead Sea Mineral Salt', desc: 'Deep skin soothing & aura recovery', icon: ingSalt },
    { id: 'epsom', name: 'Magnesium Epsom Salt', desc: 'Relieves muscle tension & night fatigue', icon: ingSalt },
];

const BOTANICALS = [
    { id: 'bay', name: 'Bay Leaves', benefit: 'Negative energy shield & purification', icon: ingBay },
    { id: 'lavender', name: 'Lavender Buds', benefit: 'Calms nerve system & deep sleep', icon: ingLavender },
    { id: 'rosemary', name: 'Rosemary', benefit: 'Enhances focus & mental clarity', icon: ingRosemary },
    { name: 'Cardamom', id: 'cardamom', benefit: 'Balances energy & heart alignment', icon: ingCardamom },
    { id: 'camphor', name: 'Vedic Camphor', benefit: 'Powerful aura cleansing & reset', icon: ingCamphor },
];

const INTENTIONS = [
    { id: 'protection', title: 'Aura Protection', desc: 'Washes away stress, envy, and heavy energy.' },
    { id: 'abundance', title: 'Abundance & Prosperity', desc: 'Opens mind & heart to wealth and opportunities.' },
    { id: 'calm', title: 'Peace & Serenity', desc: 'Calms overwhelming anxiety and racing thoughts.' },
    { id: 'love', title: 'Love & Harmony', desc: 'Fosters compassion, warmth, and self-care.' }
];

const CustomizedBathSaltPage = () => {
    const navigate = useNavigate();
    // Guest checkout — no account required.
    // const { user } = useAuth();

    const [selectedSalt, setSelectedSalt] = useState(BASE_SALTS[0]);
    const [selectedHerbs, setSelectedHerbs] = useState(['bay', 'lavender', 'camphor']);
    const [selectedIntention, setSelectedIntention] = useState(INTENTIONS[0]);
    const [customLabel, setCustomLabel] = useState('');
    const [quantity, setQuantity] = useState(1);

    /* Coupon code state */
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleHerb = (herbId) => {
        if (selectedHerbs.includes(herbId)) {
            if (selectedHerbs.length > 1) {
                setSelectedHerbs(selectedHerbs.filter(h => h !== herbId));
            }
        } else {
            setSelectedHerbs([...selectedHerbs, herbId]);
        }
    };

    const pricePerJar = 1499;
    const rawTotal = pricePerJar * quantity;
    const discountAmount = appliedCoupon ? Math.round(rawTotal * appliedCoupon.discountRate) : 0;
    const totalAmount = rawTotal - discountAmount;

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

    const handleOrderCustomBlend = () => {
        const selectedHerbNames = BOTANICALS.filter(b => selectedHerbs.includes(b.id)).map(b => b.name).join(', ');
        const customNameTag = customLabel ? ` (Custom Jar for: ${customLabel})` : '';

        const payload = {
            productId: 'custom-bath-salt',
            productName: `Custom Bath Salt Blend${customNameTag}`,
            quantity,
            subtotal: rawTotal,
            discountCode: appliedCoupon?.code || '',
            discountAmount,
            totalAmount,
            customDetails: {
                baseSalt: selectedSalt.name,
                herbs: selectedHerbNames,
                intention: selectedIntention.title,
                customLabel: customLabel || 'Standard Label'
            }
        };

        // No signup required — go straight to checkout.
        navigate('/payment', { state: { payload } });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-dark)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '6rem' }}>
            <style>{`
                .custom-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }
                .section-card {
                    background: #fff;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 12px;
                    padding: 2.5rem;
                    margin-bottom: 2.5rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                }
                .option-grid-4 {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1.2rem;
                }
                .selection-pill {
                    border: 1.5px solid #e0e0e0;
                    border-radius: 10px;
                    padding: 1.2rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    background: #fafafa;
                }
                .selection-pill.active {
                    border-color: var(--color-gold);
                    background: rgba(212,175,55,0.08);
                    box-shadow: 0 4px 12px rgba(212,175,55,0.15);
                }
                @media (max-width: 768px) {
                    .section-card { padding: 1.5rem; }
                }
            `}</style>

            <div className="custom-container">
                <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
                            Crafted for Your Unique Energy
                        </p>
                        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
                            Customized Bath Salt Ritual
                        </h1>
                        <p style={{ color: 'var(--color-text-light)', maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Formulate your personalized energised bath salt. Select your base mineral salts, sacred herbs, and energy intention.
                        </p>
                    </motion.div>
                </header>

                {/* Step 1: Base Salt */}
                <div className="section-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <span style={{ background: 'var(--color-dark)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>1</span>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>Choose Your Base Mineral Salt</h3>
                    </div>

                    <div className="option-grid-4">
                        {BASE_SALTS.map((salt) => {
                            const active = selectedSalt.id === salt.id;
                            return (
                                <div
                                    key={salt.id}
                                    className={`selection-pill ${active ? 'active' : ''}`}
                                    onClick={() => setSelectedSalt(salt)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, color: 'var(--color-dark)' }}>{salt.name}</h4>
                                        {active && <Check size={18} color="var(--color-gold)" />}
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5, margin: 0 }}>{salt.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step 2: Botanical Mix-ins */}
                <div className="section-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                        <span style={{ background: 'var(--color-dark)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>2</span>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>Select Essential Energy Botanicals</h3>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem', marginLeft: '2.5rem' }}>
                        Choose one or multiple herbs to blend into your bath jar.
                    </p>

                    <div className="option-grid-4">
                        {BOTANICALS.map((herb) => {
                            const active = selectedHerbs.includes(herb.id);
                            return (
                                <div
                                    key={herb.id}
                                    className={`selection-pill ${active ? 'active' : ''}`}
                                    onClick={() => toggleHerb(herb.id)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0 }}>{herb.name}</h4>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: active ? 'none' : '1.5px solid #ccc', background: active ? 'var(--color-gold)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {active && <Check size={14} color="#fff" />}
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5, margin: 0 }}>{herb.benefit}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step 3: Energy Intention */}
                <div className="section-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <span style={{ background: 'var(--color-dark)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>3</span>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>Select Primary Energy Intention</h3>
                    </div>

                    <div className="option-grid-4">
                        {INTENTIONS.map((intent) => {
                            const active = selectedIntention.id === intent.id;
                            return (
                                <div
                                    key={intent.id}
                                    className={`selection-pill ${active ? 'active' : ''}`}
                                    onClick={() => setSelectedIntention(intent)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0 }}>{intent.title}</h4>
                                        {active && <Sparkles size={18} color="var(--color-gold)" />}
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5, margin: 0 }}>{intent.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step 4: Personalized Jar Label */}
                <div className="section-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                        <span style={{ background: 'var(--color-dark)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>4</span>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>Personalized Label Name (Optional)</h3>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.2rem', marginLeft: '2.5rem' }}>
                        We will print this custom name on your personalized salt jar label (e.g., "Crafted for Ananya").
                    </p>

                    <div style={{ marginLeft: '2.5rem', maxWidth: '500px' }}>
                        <input
                            type="text"
                            placeholder="Enter Name for Jar Label"
                            value={customLabel}
                            onChange={(e) => setCustomLabel(e.target.value)}
                            style={{
                                width: '100%', padding: '0.85rem 1rem', border: '1.5px solid #ccc',
                                borderRadius: '8px', fontSize: '1rem', outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Summary & Checkout Box */}
                <div style={{
                    background: 'var(--color-dark)', color: '#fff',
                    borderRadius: '16px', padding: '2.5rem',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
                }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                        Your Custom Blend Summary
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Base Salt</span>
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>{selectedSalt.name}</p>
                        </div>
                        <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Botanicals</span>
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>
                                {BOTANICALS.filter(b => selectedHerbs.includes(b.id)).map(b => b.name).join(', ')}
                            </p>
                        </div>
                        <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Intention</span>
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>{selectedIntention.title}</p>
                        </div>
                        <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Label Name</span>
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>{customLabel || 'Standard 11:11 Label'}</p>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Quantity Jars:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '6px' }}>
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                        </div>
                    </div>

                    {/* Coupon Code Section */}
                    <div style={{
                        marginBottom: '2rem', padding: '1.2rem',
                        backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                        border: '1px solid rgba(212,175,55,0.3)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                            <Tag size={18} color="var(--color-gold)" />
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--color-gold)', letterSpacing: '1px' }}>
                                HAVE A DISCOUNT CODE?
                            </span>
                        </div>

                        {!appliedCoupon ? (
                            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.8rem' }}>
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                    style={{
                                        flex: 1, padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px',
                                        color: '#fff', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px'
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        background: 'var(--color-gold)', color: 'var(--color-dark)', border: 'none',
                                        padding: '0.75rem 1.8rem', borderRadius: '6px', cursor: 'pointer',
                                        fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.85rem'
                                    }}
                                >
                                    APPLY
                                </button>
                            </form>
                        ) : (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: 'rgba(212,175,55,0.15)', border: '1px solid var(--color-gold)',
                                padding: '0.75rem 1rem', borderRadius: '6px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.95rem' }}>
                                    <Check size={18} color="var(--color-gold)" />
                                    <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% OFF)</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveCoupon}
                                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}

                        {couponError && (
                            <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.5rem', margin: 0 }}>
                                {couponError}
                            </p>
                        )}
                    </div>

                    {/* Total & Checkout button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                            {appliedCoupon && (
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: '0 0 0.2rem 0' }}>
                                    Subtotal: <span style={{ textDecoration: 'line-through' }}>₹ {rawTotal.toLocaleString()}</span> (Saved ₹ {discountAmount.toLocaleString()})
                                </p>
                            )}
                            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
                                Total: ₹ {totalAmount.toLocaleString()}
                            </div>
                        </div>

                        <button
                            onClick={handleOrderCustomBlend}
                            style={{
                                background: 'var(--color-gold)', color: 'var(--color-dark)',
                                border: 'none', padding: '1.2rem 2.8rem', borderRadius: '8px',
                                fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 'bold',
                                letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem',
                                boxShadow: '0 4px 20px rgba(212,175,55,0.3)'
                            }}
                        >
                            ORDER CUSTOM BLEND <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizedBathSaltPage;
