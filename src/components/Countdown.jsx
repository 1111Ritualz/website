import React, { useState, useEffect } from 'react';

const Countdown = ({ onComplete }) => {
    // Target Time: March 22, 2026, 18:30:00 IST
    // IST is UTC+5:30. So 18:30 IST is 13:00 UTC.
    const targetDate = new Date("2026-03-22T13:00:00Z").getTime();
    
    const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            
            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft(0);
                if (onComplete) onComplete();
            } else {
                setTimeLeft(difference);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onComplete]);

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
                    font-size: clamp(1rem, 2vw, 1.4rem);
                    color: var(--color-gold-light);
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                }
                @media (max-width: 768px) {
                    .countdown-display { gap: 1.5rem; }
                }
            `}</style>
            
            <p className="countdown-subtitle fade-in">Prepare for the Ritual</p>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '4px', marginBottom: '1rem' }}>
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
            
            <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', letterSpacing: '1px' }}>
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
