import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import makerImg from '../assets/images/maker.jpeg';
import logoImg from '../assets/images/logo.jpeg';

/* ── SVG Icon Components ─────────────────────────────────────── */
const IconUser = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);
const IconMail = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);
const IconPackage = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
        <path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/>
        <path d="m7.5 4.27 9 5.15"/>
    </svg>
);
const IconShopping = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
);
const IconLeaf = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
);
const IconMail2 = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
        <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
    </svg>
);
const IconLogout = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
);
const IconArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
);

/* ── Main Component ──────────────────────────────────────────── */
const Account = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(null);

    /* Not-logged-in gate */
    if (!user) {
        return (
            <div style={{
                backgroundColor: 'var(--color-cream)', minHeight: '100vh',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '2rem', textAlign: 'center'
            }}>
                <img src={logoImg} alt="11:11 Ritualz" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-dark)', marginBottom: '0.5rem' }}>You're not signed in</h2>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Sign in to access your account and orders.</p>
                <button onClick={() => navigate('/login')} style={{ padding: '0.9rem 2.5rem', backgroundColor: 'var(--color-dark)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}>
                    Sign In
                </button>
            </div>
        );
    }

    const initials = (user.username || user.email || 'U')
        .split(/[\s@._-]/).filter(Boolean).slice(0, 2)
        .map(w => w[0].toUpperCase()).join('');

    const email    = user.email    || '—';
    const username = user.username || '—';

    const handleLogout = () => { logout(); navigate('/'); };

    const quickLinks = [
        { label: 'My Orders',  icon: <IconPackage  />, desc: 'Track and view all purchases', path: '/orders',     accent: '#5c3d2e' },
        { label: 'Shop',       icon: <IconShopping />, desc: 'Browse Ocean Shield collection', path: '/product/1', accent: '#2e5c3d' },
        { label: 'Our Story',  icon: <IconLeaf     />, desc: 'The ritual behind 11:11',       path: '/about',     accent: '#3d2e5c' },
        { label: 'Contact',    icon: <IconMail2    />, desc: 'Get in touch with our team',    path: '/contact',   accent: '#5c4b2e' },
    ];

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', fontFamily: 'var(--font-sans, sans-serif)' }}>

            {/* ── Hero Banner ── */}
            <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
                <img src={makerImg} alt="Ritual background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'brightness(0.75)' }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, rgba(10,6,3,0.3) 0%, rgba(30,18,8,0.82) 100%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                    paddingBottom: '4.5rem'
                }}>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(245,225,185,0.6)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        ✦ &nbsp; 11:11 Ritualz &nbsp; ✦
                    </p>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'rgba(245,225,185,0.92)', letterSpacing: '1px' }}>
                        Your Sacred Space
                    </p>
                </div>
            </div>

            {/* ── Avatar Medallion ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
                <div style={{
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: 'linear-gradient(145deg, #1a0f07 0%, #5c3d1e 50%, #8b6331 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '5px solid var(--color-cream)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,220,160,0.15)',
                    fontSize: '2rem', fontFamily: 'var(--font-serif)',
                    color: '#f5e6c8', letterSpacing: '3px', userSelect: 'none',
                }}>
                    {initials}
                </div>

                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--color-dark)', marginTop: '1rem', marginBottom: '0.15rem', letterSpacing: '0.5px' }}>
                    {username.charAt(0).toUpperCase() + username.slice(1)}
                </h1>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.88rem', letterSpacing: '0.3px' }}>{email}</p>
            </div>

            {/* ── Main Content ── */}
            <div style={{ maxWidth: '780px', margin: '2.5rem auto 0', padding: '0 1.25rem 6rem' }}>

                {/* Info Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Username', value: username, icon: <IconUser /> },
                        { label: 'Email',    value: email,    icon: <IconMail /> },
                    ].map(item => (
                        <div key={item.label} style={{
                            backgroundColor: 'white', borderRadius: '14px',
                            padding: '1.3rem 1.5rem',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            border: '1px solid rgba(0,0,0,0.04)',
                        }}>
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                                background: 'linear-gradient(135deg, #2c1f14, #5c3d2e)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#f5e0c0',
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0, fontWeight: 600 }}>{item.label}</p>
                                <p style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--color-dark)', margin: '0.2rem 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section Heading */}
                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '0.85rem', fontWeight: 600 }}>
                    Quick Access
                </p>

                {/* Quick-Link Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                    {quickLinks.map(link => {
                        const isHov = hovered === link.label;
                        return (
                            <div
                                key={link.label}
                                onClick={() => navigate(link.path)}
                                onMouseEnter={() => setHovered(link.label)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    backgroundColor: isHov ? link.accent : 'white',
                                    borderRadius: '14px',
                                    padding: '1.4rem 1.5rem',
                                    boxShadow: isHov
                                        ? `0 12px 32px rgba(0,0,0,0.18)`
                                        : '0 2px 16px rgba(0,0,0,0.07)',
                                    cursor: 'pointer',
                                    transition: 'all 0.28s cubic-bezier(.4,0,.2,1)',
                                    transform: isHov ? 'translateY(-4px)' : 'none',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                                    position: 'relative', overflow: 'hidden',
                                }}
                            >
                                {/* Decorative ring */}
                                <div style={{
                                    position: 'absolute', bottom: '-20px', right: '-20px',
                                    width: '90px', height: '90px', borderRadius: '50%',
                                    border: `2px solid ${isHov ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.04)'}`,
                                    transition: 'border 0.28s',
                                }} />

                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '11px',
                                    backgroundColor: isHov ? 'rgba(255,255,255,0.15)' : `${link.accent}18`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: isHov ? 'white' : link.accent,
                                    transition: 'all 0.28s',
                                }}>
                                    {link.icon}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 0.15rem', color: isHov ? 'white' : 'var(--color-dark)', transition: 'color 0.28s' }}>{link.label}</p>
                                    <p style={{ fontSize: '0.8rem', margin: 0, color: isHov ? 'rgba(255,255,255,0.65)' : 'var(--color-text-light)', transition: 'color 0.28s' }}>{link.desc}</p>
                                </div>
                                <div style={{
                                    alignSelf: 'flex-end', marginTop: 'auto',
                                    color: isHov ? 'rgba(255,255,255,0.7)' : link.accent,
                                    transition: 'all 0.28s',
                                    transform: isHov ? 'translateX(4px)' : 'none',
                                }}>
                                    <IconArrow />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Botanical Quote Strip */}
                <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '2.5rem',
                    background: 'linear-gradient(135deg, #1a0f07 0%, #3d2410 55%, #2c1a0a 100%)',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(30,15,5,0.2)',
                }}>
                    {/* Subtle gold line top */}
                    <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,155,80,0.5), transparent)' }} />
                    {/* Leaf watermarks */}
                    <div style={{ position: 'absolute', top: '-10px', left: '-10px', fontSize: '7rem', opacity: 0.06, userSelect: 'none', transform: 'rotate(-20deg)' }}>🌿</div>
                    <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', fontSize: '7rem', opacity: 0.06, userSelect: 'none', transform: 'rotate(160deg)' }}>🌿</div>

                    <p style={{ fontSize: '0.7rem', color: 'rgba(200,155,80,0.7)', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 1rem', position: 'relative', zIndex: 1 }}>
                        ✦ &nbsp; Ritual Wisdom &nbsp; ✦
                    </p>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#f5e0c0', lineHeight: 1.8, margin: '0 0 1rem', position: 'relative', zIndex: 1 }}>
                        "Every drop is crafted with intention.<br />You are part of the ritual."
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(245,224,192,0.45)', letterSpacing: '2.5px', textTransform: 'uppercase', margin: 0, position: 'relative', zIndex: 1 }}>— 11:11 Ritualz</p>
                    {/* Subtle gold line bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,155,80,0.5), transparent)' }} />
                </div>

                {/* Sign Out */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                            padding: '0.75rem 2rem',
                            backgroundColor: 'transparent',
                            border: '1.5px solid #c0392b',
                            color: '#c0392b',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.25s',
                            letterSpacing: '0.5px',
                            fontWeight: 600,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#c0392b'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#c0392b'; }}
                    >
                        <IconLogout /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
