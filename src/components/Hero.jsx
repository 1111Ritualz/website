import React from "react";
import { Link } from 'react-router-dom';
import heroVideo from "../assets/videos/1111.mp4";
import logo from "../assets/images/logo.jpeg";

const Hero = () => {
    return (
        <>
            <section className="hero-main-section" style={{
                height: "100vh",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
            }}>
                <style>{`
                .hero-title {
                    font-size: clamp(2.2rem, 7vw, 4rem);
                    margin-bottom: 1.5rem;
                    color: white;
                    font-family: var(--font-serif);
                    font-weight: 400;
                    letter-spacing: 2px;
                }
                .hero-subtitle {
                    font-size: clamp(1rem, 2.5vw, 1.4rem);
                    margin-bottom: 8rem;
                    color: white;
                    line-height: 1.8;
                    font-weight: 300;
                }
                @media (max-width: 768px) {
                    .hero-content { padding: 0 1.5rem !important; }
                    .hero-main-section { height: 70vh !important; }
                }
            `}</style>

                {/* Background Video */}
                <video
                    className="hero-video"
                    style={{
                        position: "absolute", top: 0, left: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover", zIndex: 0, filter: "brightness(0.85)",
                    }}
                    src={heroVideo}
                    autoPlay loop muted playsInline preload="auto"
                />

                {/* Overlay - now using a warm dark tint instead of pure black */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundColor: "rgba(61, 57, 53, 0.4)", zIndex: 1,
                }} />

                {/* Content */}
                <div className="hero-content fade-in" style={{
                    position: "relative", zIndex: 2,
                    maxWidth: "1000px", padding: "0 2rem",
                }}>
                    <h2 className="hero-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', lineHeight: 1.2 }}>
                        Your shower cleans your skin.<br />
                        Nothing cleans what it leaves behind.
                    </h2>
                    <p className="hero-subtitle" style={{ fontStyle: 'italic', fontSize: '1.4rem' }}>
                        Until now
                    </p>
                </div>
            </section>

            {/* CTA Bar below video */}
            <div style={{
                backgroundColor: 'var(--color-dark)',
                padding: '5rem 2.5rem',
                textAlign: 'center',
                borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
            }}>
                <Link
                    to="/product/1"
                    className="btn"
                    style={{
                        backgroundColor: "#fff",
                        color: "var(--color-dark)",
                        border: "1px solid var(--color-gold)",
                        padding: '1.2rem 3rem',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-serif)',
                        letterSpacing: '1px',
                        display: 'inline-block',
                        transition: 'all 0.3s'
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                        e.currentTarget.style.color = '#fff';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.color = 'var(--color-dark)';
                    }}
                >
                    Begin the Ritual
                </Link>
                <p style={{ marginTop: '2rem', fontSize: '2rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px' }}>
                    No essential oils. No machines. Made in small batches with intention.
                </p>
            </div>
        </>
    );
};

export default Hero;
