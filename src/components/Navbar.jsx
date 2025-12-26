import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(250, 249, 246, 0.95)' : 'transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        padding: isScrolled ? '1rem 0' : '2rem 0',
    };

    return (
        <nav style={navStyles}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-btn" style={{ display: 'none' }}>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Logo */}
                <Link to="/" style={{ color: "white", fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    1111 Ritualz
                </Link>

                {/* Desktop Links */}
                <ul className="desktop-links" style={{ color: "white", display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/about">Our Story</Link></li>
                    <li><Link to="/readings">Readings</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                </ul>

                {/* Icons */}
                <div style={{ color: "white", display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Search size={20} style={{ cursor: 'pointer' }} />

                    {/* Auth Links */}
                    {user ? (
                        <>
                            <Link to="/account" style={{ color: 'white', textDecoration: 'none' }}>Account</Link>
                            <Link to="/logout" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link>
                        </>
                    ) : (
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}><User size={20} style={{ cursor: 'pointer' }} /> LogIn</Link>
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
