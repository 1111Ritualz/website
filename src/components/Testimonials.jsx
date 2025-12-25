import React from 'react';
import { testimonials } from '../data';

const Testimonials = () => {
    return (
        <section className="section-padding" style={{ backgroundColor: '#f5f5f5' }}>
            <div className="container text-center">
                <h2>Voices of the Soulstars</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                    {testimonials.map(item => (
                        <div key={item.id} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>"{item.text}"</p>
                            <h5 style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>- {item.author}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
