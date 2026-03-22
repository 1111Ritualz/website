import React from 'react';
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

                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                        <img src={logo} alt="11:11 Ritualz" style={{ height: '40px', borderRadius: '4px' }} />
                        <h3 style={{ color: 'var(--color-gold-light)', fontFamily: 'var(--font-serif)', margin: 0 }}>11:11 Ritualz</h3>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                        Energised bath rituals designed to help you cleanse not just your body, but your energy. Every day.
                    </p>
                    <div className="footer-social" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', color: 'var(--color-gold)' }}>
                        <Instagram size={20} style={{ cursor: 'pointer' }} />
                        <Facebook size={20} style={{ cursor: 'pointer' }} />
                        <Youtube size={20} style={{ cursor: 'pointer' }} />
                        <Mail size={20} style={{ cursor: 'pointer' }} />
                    </div>
                </div>

            </div>

            <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                <p>&copy; {new Date().getFullYear()} 11:11 Ritualz. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
