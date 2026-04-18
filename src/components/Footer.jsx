import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import logo from '../assets/images/logo.jpeg';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-dark)', color: '#fff', padding: '4rem 0 2rem' }}>
            <style>{`
                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                .footer-link {
                    color: rgba(255,255,255,0.7);
                    transition: color 0.3s;
                    display: block;
                    margin-bottom: 0.8rem;
                }
                .footer-link:hover {
                    color: var(--color-gold);
                }
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .footer-social {
                        justify-content: center !important;
                    }
                }
            `}</style>
            <div className="container footer-grid">
                {/* Brand & Mission */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                        <img src={logo} alt="11:11 Ritualz" style={{ height: '40px', borderRadius: '4px' }} />
                        <h3 style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-serif)', margin: 0 }}>11:11 Ritualz</h3>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                        Energised bath rituals designed to help you cleanse not just your body, but your energy. Every day.
                    </p>
                    <div className="footer-social" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', color: 'var(--color-gold)' }}>
                        <Instagram size={20} style={{ cursor: 'pointer' }} />
                        <Facebook size={20} style={{ cursor: 'pointer' }} />
                        <Youtube size={20} style={{ cursor: 'pointer' }} />
                        <Mail size={20} style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                {/* Main Links */}
                <div>
                    <h4 style={{ color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Site Links</h4>
                    <div style={{ fontSize: '0.85rem' }}>
                        {/* <Link to="/ritual" className="footer-link">The Ritual</Link> */}
                        <Link to="/about" className="footer-link">About Us</Link>
                        <Link to="/contact" className="footer-link">Contact Us</Link>
                        <Link to="/account" className="footer-link">My Account</Link>
                        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                        <Link to="/return-policy" className="footer-link">Return and Refunds</Link>
                        <Link to="/disclaimer" className="footer-link">Disclaimer</Link>
                        <Link to="/shipping-policy" className="footer-link">Shipping Policy</Link>
                        <Link to="/safety-instructions" className="footer-link">Safety Instructions</Link>
                        <Link to="/faq" className="footer-link">FAQ’s</Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Quick Links</h4>
                    <div style={{ fontSize: '0.85rem' }}>
                        <Link to="/ingredients" className="footer-link">Ingredients</Link>
                        <Link to="/blogs" className="footer-link">Blogs</Link>
                    </div>
                </div>

                {/* Newsletter & Contact */}
                <div>
                    <h4 style={{ color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Newsletter</h4>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>Sign up for our newsletter</p>
                    <div style={{ display: 'flex', marginBottom: '2rem' }}>
                        <input type="email" placeholder="Email" style={{ padding: '0.6rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%' }} />
                        <button style={{ padding: '0.6rem 1rem', background: 'var(--color-gold)', border: 'none', color: 'var(--color-dark)', cursor: 'pointer' }}>Go</button>
                    </div>

                    <h4 style={{ color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Follow Us</h4>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>Email: 1111rirualz@gmail.com</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>WhatsApp: +91 8484834344</p>
                </div>
            </div>

            <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <p>&copy; {new Date().getFullYear()} 11:11 Ritualz. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
