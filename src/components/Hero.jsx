import React from "react";
import heroVideo from "../assets/videos/1111.mp4";
import logo from "../assets/images/logo.jpeg";

const Hero = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                    margin-bottom: 2rem;
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
                    maxWidth: "900px", padding: "0 2rem",
                }}>
                    {/* <img
                    src={logo}
                    alt="11:11 Ritualz"
                    style={{
                        height: '100px', borderRadius: '12px',
                        margin: '0 auto 2.5rem', display: 'block',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}
                /> */}
                    <h1 className="hero-title">
                        Welcome to 11:11 Ritualz
                    </h1>
                    <p className="hero-subtitle">
                        Pause. Cleanse. Begin Again.
                        Cleanse More Than Just Your Body
                    </p>
                </div>
            </section>

            {/* CTA Bar below video */}
            <div style={{
                backgroundColor: 'var(--color-cream)',
                padding: '5rem 2.5rem',
                textAlign: 'center',
                borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
            }}>
                <button
                    onClick={() => scrollToSection('consistent-use')}
                    className="btn"
                    style={{
                        backgroundColor: "#fff",
                        color: "var(--color-dark)",
                        border: "1px solid var(--color-gold)",
                        padding: '1.2rem 3rem',
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                        cursor: 'pointer'
                    }}
                >
                    Start your first ritual, start with Ocean's Shield.
                </button>
            </div>
        </>
    );
};

export default Hero;
