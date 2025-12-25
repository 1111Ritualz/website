import React from 'react';

const Hero = () => {
    const heroStyles = {
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5d2294c?q=80&w=2000&auto=format&fit=crop")', // Abstract spiritual background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        position: 'relative'
    };

    const overlayStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)'
    };

    const contentStyles = {
        position: 'relative',
        zIndex: 1,
        padding: '0 1rem',
        maxWidth: '800px'
    };

    return (
        <section style={heroStyles}>
            <div style={overlayStyles}></div>
            <div style={contentStyles} className="fade-in">
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                    Welcome to 1111 Ritualz
                </h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#f0f0f0', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Making spirituality simple through lightcoded products. Discover crystals, home products, Feng Shui, and more aligned with your soul's journey.
                </p>
                <button className="btn" style={{ borderColor: '#fff', color: '#fff' }}>
                    Explore Collection
                </button>
            </div>
        </section>
    );
};

export default Hero;
