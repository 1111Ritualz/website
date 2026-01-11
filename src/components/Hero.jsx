import React from "react";
import heroVideo from "../assets/videos/1111R.mp4";

const Hero = () => {
    const heroStyles = {
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
    };

    const videoStyles = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
        filter: "brightness(0.6)",
    };

    const overlayStyles = {
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        zIndex: 1,
    };

    const contentStyles = {
        position: "relative",
        zIndex: 2,
        maxWidth: "800px",
        padding: "0 1rem",
    };

    return (
        <section style={heroStyles}>
            {/* Background Video */}
            <video
                style={videoStyles}
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
            />

            {/* Overlay */}
            <div style={overlayStyles} />

            {/* Content */}
            <div style={contentStyles} className="fade-in">
                <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "white" }}>
                    Welcome to 1111 Richualz
                </h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "white" }}>
                    Making spirituality simple through lightcoded products.
                </p>
                <button className="btn">Explore Collection</button>
            </div>
        </section>
    );
};

export default Hero;
