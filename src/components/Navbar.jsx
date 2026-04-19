import React, { useState, useEffect } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.jpeg';

const Navbar = () => {
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';
    const transparent = isHome && !scrolled;
    const textColor = transparent ? '#ffffff' : '#1a0f07';

    useEffect(() => {
        setScrolled(false);
        setMobileOpen(false);
        const onScroll = () => {
            if (isHome) setScrolled(window.scrollY > window.innerHeight * 0.8);
            else setScrolled(true);
        };
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome, location.pathname]);

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const navLinks = [
        { label: 'Home',  to: '/' },
        { label: 'Shop',  to: '/shop' },
    ];

    const authLinks = user
        ? [
            { label: 'Account', to: '/account' },
            { label: 'Orders',  to: '/orders'  },
            { label: 'Logout',  to: '/logout'  },
          ]
        : [{ label: 'Login', to: '/login', icon: true }];

    return (
        <>
            <style>{`
                /* ── Navbar Base ── */
                .nb-bar {
                    position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
                    transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
                    backdrop-filter: blur(0px);
                }
                .nb-bar.solid {
                    background: rgba(250,249,246,0.97);
                    box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06);
                    backdrop-filter: blur(12px);
                }
                /* ── Inner Layout ── */
                .nb-inner {
                    max-width: 1280px; margin: 0 auto;
                    padding: 0 2rem;
                    height: 72px;
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                }
                /* ── Logo ── */
                .nb-logo {
                    display: flex; align-items: center; gap: 0.55rem;
                    text-decoration: none; justify-self: start;
                }
                .nb-logo img {
                    height: 48px; border-radius: 6px;
                    transition: height 0.3s;
                }
                .nb-logo span {
                    font-family: var(--font-serif);
                    font-size: 1.15rem; font-weight: bold;
                    letter-spacing: 2px; text-transform: uppercase;
                    white-space: nowrap;
                }
                /* ── Center: Nav Links ── */
                .nb-links {
                    display: flex; gap: 2.5rem; list-style: none;
                    margin: 0; padding: 0;
                }
                .nb-links a {
                    font-size: 0.8rem; font-weight: 600;
                    text-transform: uppercase; letter-spacing: 1.5px;
                    text-decoration: none;
                    position: relative; padding-bottom: 2px;
                }
                .nb-links a::after {
                    content: '';
                    position: absolute; bottom: -2px; left: 0; right: 100%;
                    height: 1.5px;
                    background: currentColor;
                    transition: right 0.28s ease;
                }
                .nb-links a:hover::after,
                .nb-links a.active::after { right: 0; }

                /* ── Right: Auth Links ── */
                .nb-auth {
                    display: flex; gap: 1.5rem; align-items: center;
                    justify-self: end;
                }
                .nb-auth a {
                    font-size: 0.8rem; font-weight: 600;
                    text-transform: uppercase; letter-spacing: 1.5px;
                    text-decoration: none;
                    position: relative; padding-bottom: 2px;
                }
                .nb-auth a::after {
                    content: '';
                    position: absolute; bottom: -2px; left: 0; right: 100%;
                    height: 1.5px; background: currentColor;
                    transition: right 0.28s ease;
                }
                .nb-auth a:hover::after { right: 0; }

                /* ── Mobile hamburger ── */
                .nb-ham {
                    display: none; background: none; border: none;
                    cursor: pointer; padding: 4px; justify-self: end;
                }

                /* ── Mobile Drawer ── */
                .nb-drawer {
                    position: fixed; inset: 0; z-index: 999;
                    background: rgba(250,249,246,0.99);
                    backdrop-filter: blur(16px);
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    gap: 2rem;
                    transform: translateX(100%);
                    transition: transform 0.38s cubic-bezier(.4,0,.2,1);
                }
                .nb-drawer.open { transform: translateX(0); }
                .nb-drawer-close {
                    position: absolute; top: 1.4rem; right: 1.4rem;
                    background: none; border: none; cursor: pointer;
                    color: var(--color-dark);
                }
                .nb-drawer a {
                    font-family: var(--font-serif);
                    font-size: 1.8rem; letter-spacing: 3px;
                    color: var(--color-dark); text-decoration: none;
                    text-transform: uppercase;
                    transition: opacity 0.2s;
                }
                .nb-drawer a:hover { opacity: 0.5; }
                .nb-sep {
                    width: 40px; height: 1px;
                    background: rgba(0,0,0,0.15);
                }

                /* ── Responsive ── */
                @media (max-width: 768px) {
                    .nb-inner {
                        grid-template-columns: auto 1fr auto;
                        padding: 0 1.25rem;
                    }
                    .nb-links { display: none; }
                    .nb-auth  { display: none; }
                    .nb-ham   { display: flex; }
                    .nb-logo span { font-size: 1rem; }
                }
            `}</style>

            {/* ── Bar ── */}
            <nav className={`nb-bar ${!transparent ? 'solid' : ''}`}>
                <div className="nb-inner">
                    {/* Logo — left */}
                    <Link to="/" className="nb-logo">
                        <img src={logo} alt="11:11 Ritualz" />
                        <span style={{ color: textColor }}>11:11 Ritualz</span>
                    </Link>

                    {/* Nav links — center */}
                    <ul className="nb-links">
                        {navLinks.map(l => (
                            <li key={l.to}>
                                <Link
                                    to={l.to}
                                    style={{ color: textColor }}
                                    className={location.pathname === l.to ? 'active' : ''}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Auth links — right (desktop) */}
                    <div className="nb-auth">
                        {authLinks.map(l => (
                            <Link key={l.to} to={l.to} style={{ color: textColor }}>
                                {l.icon ? <User size={20} strokeWidth={1.8} /> : l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Hamburger — mobile only */}
                    <button
                        className="nb-ham"
                        onClick={() => setMobileOpen(true)}
                        style={{ color: textColor }}
                        aria-label="Open menu"
                    >
                        <Menu size={24} strokeWidth={1.8} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Drawer ── */}
            <div className={`nb-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
                <button
                    className="nb-drawer-close"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                >
                    <X size={28} strokeWidth={1.8} />
                </button>

                <img src={logo} alt="11:11 Ritualz" style={{ height: '70px', borderRadius: '6px', marginBottom: '0.5rem' }} />

                {navLinks.map(l => (
                    <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>{l.label}</Link>
                ))}

                <div className="nb-sep" />

                {authLinks.map(l => (
                    <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
                        {l.label || 'Login'}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Navbar;
