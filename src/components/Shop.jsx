import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '../data';

const Shop = () => {
    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '5rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}
                    >
                        The Collection
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}
                    >
                        Tools for Your Ritualz
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60px' }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ height: '2px', backgroundColor: 'var(--color-gold)', margin: '0 auto' }}
                    />
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '3rem'
                }}>
                    {products.map((product, index) => {
                        const linkTo = product.limitedEdition ? '/diwali-gifting' : `/product/${product.id}`;
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s',
                                    position: 'relative'
                                }}
                                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            >
                                {product.badge && (
                                    <div style={{
                                        position: 'absolute', top: '16px', left: '16px', zIndex: 2,
                                        background: 'linear-gradient(135deg, #c8960c, #f5d16e)',
                                        color: '#1a0a00',
                                        fontSize: '0.65rem', fontWeight: '800', letterSpacing: '1.5px',
                                        padding: '0.35rem 0.9rem', borderRadius: '20px',
                                        boxShadow: '0 2px 8px rgba(200,150,12,0.4)'
                                    }}>
                                        {product.badge}
                                    </div>
                                )}
                                <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            backgroundColor: 'rgba(0,0,0,0.05)',
                                            transition: 'background-color 0.3s'
                                        }} />
                                    </div>
                                    <div style={{ padding: '2rem' }}>
                                        <p style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                            {product.category}
                                        </p>
                                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                                            {product.name}
                                        </h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{product.price}</span>
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                                color: 'var(--color-gold)', fontSize: '0.9rem', fontWeight: '500'
                                            }}>
                                                VIEW DETAILS <ArrowRight size={16} />
                                            </span>
                                        </div>
                                        {product.preOrderDeadline && (
                                            <p style={{ fontSize: '0.75rem', color: '#c0392b', marginTop: '0.6rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                                                🕯 Pre-orders close: {product.preOrderDeadline}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Shop;
