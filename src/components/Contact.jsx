import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 0 80px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '8px', fontSize: '0.9rem', textTransform: 'uppercase' }}>GET IN TOUCH</span>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginTop: '1rem' }}>Contact Us</h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    {/* Contact Info */}
                    <div>
                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>We're here for you.</h3>
                            <p style={{ color: 'var(--color-text-light)', lineHeight: 1.8 }}>
                                Whether you have a question about a ritual, your order, or just want to share your experience, we'd love to hear from you.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ color: 'var(--color-gold)' }}><Mail size={24} /></div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-gold)' }}>Email</h4>
                                    <p>1111rirualz@gmail.com</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ color: 'var(--color-gold)' }}><Phone size={24} /></div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-gold)' }}>WhatsApp</h4>
                                    <p>+91 8484834344</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Placeholder */}
                    <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>Name</label>
                                <input type="text" style={{ width: '100%', padding: '0.8rem', border: '1px solid #eee', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                                <input type="email" style={{ width: '100%', padding: '0.8rem', border: '1px solid #eee', borderRadius: '4px' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem' }}>Message</label>
                                <textarea rows="5" style={{ width: '100%', padding: '0.8rem', border: '1px solid #eee', borderRadius: '4px' }}></textarea>
                            </div>
                            <button className="btn" style={{ width: '100%' }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
