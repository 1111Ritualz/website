import React from 'react';
import { Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-dark)', color: '#fff', padding: '4rem 0 2rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                {/* Brand */}
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>1111 Ritualz</h3>
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                        Lightcoded crystals, healing bracelets, feng shui items & spiritual decor, blessed to support self-care, energy & transformation.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Instagram size={20} />
                        <Facebook size={20} />
                        <Youtube size={20} />
                        <Mail size={20} />
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Quick Links</h4>
                    <ul style={{ color: '#999', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Collections */}
                <div>
                    <h4 style={{ color: '#fff', marginBottom: '1.5rem' }}>Collections</h4>
                    <ul style={{ color: '#999', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><a href="#">New Energies</a></li>
                        <li><a href="#">Mystic Mix Bracelets</a></li>
                        <li><a href="#">Rare Crystals</a></li>
                        <li><a href="#">Gemstones</a></li>
                    </ul>
                </div>


            </div>

            <div className="container" style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>
                <p>&copy; {new Date().getFullYear()} 1111 Ritualz. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
