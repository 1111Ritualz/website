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

                    <div className="footer-social" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <a href="https://www.instagram.com/11_11_ritualz?igsh=MWhwMnJlZzhidDFmcg%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
                            <Instagram size={20} />
                        </a>
                        <a href="https://youtube.com/@1111ritualz?si=BxRB1oqaEVpEjQE8" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
                            <Youtube size={20} />
                        </a>
                        <a href="https://pin.it/1ftPrqMk0" target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026h.032z" />
                            </svg>
                        </a>

                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>Email: 1111rirualz@gmail.com</p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>WhatsApp: +91 8484834344</p>

                    <h4 style={{ color: 'var(--color-gold)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Address</h4>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem', lineHeight: 1.6 }}>
                        Manufactured by:-<br/>
                        Eleveneleven Ritualz Pvt Ltd.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                        A-11/14 Shreeyash Apt, Jay Bharat Naka,<br/>Old Panvel. 410206
                    </p>

                </div>
            </div>

            <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <p>&copy; {new Date().getFullYear()} 11:11 Ritualz. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
