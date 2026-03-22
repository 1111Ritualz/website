import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();
    const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isHomePage = location.pathname === '/';

    // Determine text color: white only on home page hero section, black everywhere else
    const textColor = (isHomePage && !isScrolledPastHero) ? '#ffffff' : '#000000';

    // Determine if navbar should have background: always show except when on home page hero section
    const shouldShowBackground = !(isHomePage && !isScrolledPastHero);

    useEffect(() => {
        // Reset scroll state when route changes
        setIsScrolledPastHero(false);

        const handleScroll = () => {
            if (isHomePage) {
                // Hero section is 100vh, so check if scrolled past viewport height
                setIsScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Check initial scroll position
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
        padding: shouldShowBackground ? '1rem 0' : '2rem 0',
    };

    return (
        <nav style={navStyles}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-btn" style={{ display: 'none' }}>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor }}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Logo */}
                <Link
                    to="/"
                    style={{
                        color: textColor,
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}
                >
                    1111 Richualz
                </Link>

                {/* Desktop Links */}
                <ul
                    className="desktop-links"
                    style={{
                        color: textColor,
                        display: 'flex',
                        gap: '2rem',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    <li><Link to="/" style={{ color: textColor, textDecoration: 'none' }}>Home</Link></li>
                    <li><Link to="/shop" style={{ color: textColor, textDecoration: 'none' }}>Shop</Link></li>
                    {/* <li><Link to="/about" style={{ color: textColor, textDecoration: 'none' }}>Our Story</Link></li> */}
                    <li><Link to="/readings" style={{ color: textColor, textDecoration: 'none' }}>Readings</Link></li>
                    {/* <li><Link to="/blog" style={{ color: textColor, textDecoration: 'none' }}>Blog</Link></li> */}
                </ul>

                {/* Icons */}
                <div style={{ color: textColor, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Search size={20} style={{ cursor: 'pointer' }} />

                    {/* Auth Links */}
                    {user ? (
                        <>
                            <Link to="/account" style={{ color: textColor, textDecoration: 'none' }}>Account</Link>
                            <Link to="/logout" style={{ color: textColor, textDecoration: 'none' }}>Logout</Link>
                        </>
                    ) : (
                        <Link to="/login" style={{ color: textColor, textDecoration: 'none' }}>
                            <User size={20} style={{ cursor: 'pointer' }} /> LogIn
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
            <style>{`
        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
