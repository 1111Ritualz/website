import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const Countdown = ({ onComplete }) => {
    // Target Time: March 22, 2026, 18:30:00 IST
    // IST is UTC+5:30. So 18:30 IST is 13:00 UTC.
    const targetDate = new Date("2026-03-22T18:30:00+05:30").getTime();

    const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
    const [isBursting, setIsBursting] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0 && !isBursting) {
            handleComplete();
            return;
        }

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft(0);
                handleComplete();
            } else {
                setTimeLeft(difference);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

    const handleComplete = () => {
        if (isBursting) return;
        setIsBursting(true);

        // Celebration burst!
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // Transition to website after a short delay
        setTimeout(() => {
            if (onComplete) onComplete();
        }, 3000);
    };

    const formatTime = (ms) => {
        if (ms <= 0) return { h: '00', m: '00', s: '00' };
        const h = Math.floor(ms / (1000 * 60 * 60)).toString().padStart(2, '0');
        const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const s = Math.floor((ms % (1000 * 60)) / 1000).toString().padStart(2, '0');
        return { h, m, s };
    };

    const { h, m, s } = formatTime(timeLeft);

    if (timeLeft <= 0) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'var(--color-dark)',
            color: 'var(--color-gold)',
            zIndex: 9999,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            fontFamily: 'var(--font-serif)',
        }}>
            <style>{`
                .countdown-display {
                    display: flex; gap: 3rem; margin: 3rem 0;
                }
                .countdown-item {
                    display: flex; flexDirection: column; alignItems: center;
                }
                .countdown-num {
                    font-size: clamp(3rem, 10vw, 6rem);
                    font-weight: 300;
                    letter-spacing: 4px;
                }
                .countdown-label {
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                    color: rgba(212, 175, 55, 0.6);
                    margin-top: 0.5rem;
                }
                .countdown-subtitle {
                    font-size: clamp(0.9rem, 1.5vw, 1.2rem);
                    color: var(--color-gold);
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                    opacity: 0.8;
                }
                @media (max-width: 768px) {
                    .countdown-display { gap: 1.5rem; margin: 2rem 0; }
                    .countdown-num { font-size: 3rem; }
                    .countdown-label { font-size: 0.7rem; letter-spacing: 1px; }
                }
            `}</style>

            <p className="countdown-subtitle fade-in">Prepare for the Ritual</p>

            <h1 className="fade-in" style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                letterSpacing: '8px', 
                marginBottom: '1.5rem',
                color: 'var(--color-gold-light)',
                fontWeight: '300',
                textTransform: 'uppercase'
            }}>
                11:11 Ritualz
            </h1>

            <div className="countdown-display fade-in">
                <div className="countdown-item">
                    <span className="countdown-num">{h}</span>
                    <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-num">{m}</span>
                    <span className="countdown-label">Minutes</span>
                </div>
                <div className="countdown-item">
                    <span className="countdown-num">{s}</span>
                    <span className="countdown-label">Seconds</span>
                </div>
            </div>

            <div className="fade-in" style={{ 
                maxWidth: '600px', 
                margin: '0 auto', 
                fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', 
                color: 'rgba(255,255,255,0.8)', 
                fontStyle: 'italic', 
                letterSpacing: '1px',
                padding: '0 1rem'
            }}>
                The ocean is calling. See you at 6:30 PM IST.
            </div>

            <div style={{
                width: '60px', height: '1px',
                backgroundColor: 'var(--color-gold)',
                marginTop: '4rem', opacity: 0.4
            }} />
        </div>
    );
};

export default Countdown;
