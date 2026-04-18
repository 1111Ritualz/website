import React from 'react';
import { motion } from 'framer-motion';
import heroVideo from "../assets/videos/1111.mp4";

const OceanVisionSection = () => {
    return (
        <section style={{
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
            {/* Background Video */}
            <video
                style={{
                    position: "absolute", top: 0, left: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover", zIndex: 0, filter: "brightness(0.7)",
                }}
                src={heroVideo}
                autoPlay loop muted playsInline
            />

            {/* Overlay */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex: 1,
            }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, maxWidth: "1000px", padding: "0 2rem" }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        color: '#fff',
                        lineHeight: 1.2,
                        marginBottom: '1.5rem',
                        fontWeight: 300
                    }}
                >
                    Your shower cleans your skin.<br />
                    Nothing cleans what it leaves behind.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        fontSize: '1.4rem',
                        fontStyle: 'italic',
                        color: '#fff',
                        marginBottom: '3rem',
                        fontWeight: 300
                    }}
                >
                    Until now
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <button className="btn" style={{
                        backgroundColor: 'transparent',
                        color: '#fff',
                        borderColor: '#fff',
                        padding: '1.2rem 3.5rem',
                        fontSize: '1rem',
                        letterSpacing: '3px'
                    }}>
                        Begin the Ritual
                    </button>
                    <p style={{
                        marginTop: '2rem',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '1px',
                        fontWeight: 300
                    }}>
                        No essential oils. No machines. Made in small batches with intention.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default OceanVisionSection;
