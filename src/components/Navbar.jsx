import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.jpeg';

const Navbar = () => {
    const { user } = useAuth();
    const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isHomePage = location.pathname === '/';

    const textColor = (isHomePage && !isScrolledPastHero) ? '#ffffff' : '#000000';
    const shouldShowBackground = !(isHomePage && !isScrolledPastHero);

    useEffect(() => {
        setIsScrolledPastHero(false);
        setIsMobileMenuOpen(false);

        const handleScroll = () => {
            if (isHomePage) {
                setIsScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage, location.pathname]);

    const navStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: shouldShowBackground ? 'rgba(250, 249, 246, 0.95)' : 'transparent',
        boxShadow: shouldShowBackground ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        padding: shouldShowBackground ? '0.6rem 0' : '1rem 0',
    };

    return (
        <nav style={navStyles}>
            <style>{`
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .desktop-links {
                    display: flex;
                    gap: 2rem;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .nav-icons {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .mobile-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(250,249,246,0.98);
                    z-index: 999;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                }
                .mobile-overlay.open {
                    display: flex;
                }
                .mobile-overlay a {
                    font-size: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: var(--color-dark);
                    text-decoration: none;
                    font-family: var(--font-serif);
                }
                .mobile-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .desktop-links { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                    .nav-icons .nav-hide-mobile { display: none; }
                }
            `}</style>

            <div className="container nav-container">
                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(true)}
                    style={{ color: textColor }}
                >
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img
                        src={logo}
                        alt="11:11 Ritualz"
                        style={{
                            height: shouldShowBackground ? '40px' : '50px',
                            transition: 'height 0.3s ease',
                            borderRadius: '4px',
                        }}
                    />
                    <span style={{
                        color: textColor,
                        fontSize: '1.3rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                    }}>
                        11:11 Ritualz
                    </span>
                </Link>

                {/* Desktop Links */}
                <ul className="desktop-links" style={{ color: textColor }}>
                    {/* <li><Link to="/" style={{ color: textColor, textDecoration: 'none' }}>Home</Link></li> */}
                    {/* <li><Link to="/shop" style={{ color: textColor, textDecoration: 'none' }}>Shop</Link></li> */}
                    {/* <li><Link to="/readings" style={{ color: textColor, textDecoration: 'none' }}>Readings</Link></li> */}
                </ul>

                {/* Icons */}
                <div className="nav-icons" style={{ color: textColor }}>
                    <Search size={20} style={{ cursor: 'pointer' }} className="nav-hide-mobile" />

                    {user ? (
                        <>
                            <Link to="/account" style={{ color: textColor, textDecoration: 'none' }} className="nav-hide-mobile">Account</Link>
                            <Link to="/logout" style={{ color: textColor, textDecoration: 'none' }} className="nav-hide-mobile">Logout</Link>
                        </>
                    ) : (
                        <Link to="/login" style={{ color: textColor, textDecoration: 'none' }}>
                            <User size={20} style={{ cursor: 'pointer' }} />
                        </Link>
                    )}

                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                        <ShoppingBag size={20} />
                        <span style={{
                            position: 'absolute', top: '-8px', right: '-8px',
                            backgroundColor: 'var(--color-gold)', color: '#fff',
                            fontSize: '0.7rem', padding: '2px 6px', borderRadius: '50%'
                        }}>0</span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <button
                    className="mobile-close"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={28} />
                </button>
                <img src={logo} alt="11:11 Ritualz" style={{ height: '60px', borderRadius: '4px', marginBottom: '1rem' }} />
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                {user ? (
                    <>
                        <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
                        <Link to="/logout" onClick={() => setIsMobileMenuOpen(false)}>Logout</Link>
                    </>
                ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
