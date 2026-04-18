import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 0 80px' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '8px', fontSize: '0.9rem', textTransform: 'uppercase' }}>OUR STORY</span>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ fontSize: '1.2rem', color: 'var(--color-dark)', lineHeight: 1.8, marginBottom: '2rem' }}
                >
                    <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
                        By the end of the day, you’re carrying more than you realise.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Stress. Conversations. Mental noise.<br/>
                        It stays with you, all the ‘better’ responses to so many people and situations.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                        And nothing in your routine is designed to remove it.
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
                        We didn’t set out to build a brand.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We were trying to solve a simple problem. How to actually feel clear again at the end of the day.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Inspired by a simple belief from the Konkan coast that water has the ability to take things away, we started experimenting with salt, herbs, and intention.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                        Not as a product.<br/>
                        As a way to reset.
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
                        The shift was noticeable.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Better sleep. Less mental clutter. A real sense of release.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                        Not instant. But consistent.
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
                        So we built it the same way we still use it.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        No added oils.<br/>
                        Everything is hand pounded. Each blend is made with intention, while playing carefully chosen mantras.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                        Because how something is made matters as much as what goes into it.
                    </p>
                    <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
                        11:11 Ritualz is built to help you do one thing well. Let go of what you don’t need to carry.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Start with one ritual.
                    </p>
                    <p style={{ marginBottom: '3rem' }}>
                        Ocean’s Shield is where it begins.
                    </p>
                    
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <Link to="/product/1" className="btn" style={{ padding: '1.2rem 3rem' }}>Begin the Ritual</Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default About;
