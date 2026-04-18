import React from 'react';
import saltImg from '../assets/images/ingredient_sea_salt_1776526963161.png';
import rosemaryImg from '../assets/images/ingredient_rosemary_1776527008835.png';
import lavenderImg from '../assets/images/ingredient_lavender_1776527024326.png';
import bayImg from '../assets/images/ingredient_bay_leaves_1776527110544.png';
import cardamomImg from '../assets/images/ing_cardamom_1776527404764.png';

const IngredientsPage = () => {
    const ingredients = [
        {
            name: "Sea Salt",
            img: saltImg,
            desc: "Mineral-rich crystals that detoxify both body and aura. Absorbs negative energy and grounds the spirit."
        },
        {
            name: "Lavender Buds",
            img: lavenderImg,
            desc: "Whole lavender flowers (not oils) for deep emotional healing and nervous system reset."
        },
        {
            name: "Rosemary",
            img: rosemaryImg,
            desc: "Potent herb for clearing psychic fog and supporting mental clarity."
        },
        {
            name: "Bay Leaves",
            img: bayImg,
            desc: "Used for centuries for purification and manifesting successful intentions."
        },
        {
            name: "Cardamom",
            img: cardamomImg,
            desc: "Provides heart-centered balance and revitalizes stagnant spirit energy."
        },
        {
            name: "Camphor",
            img: 'https://images.unsplash.com/photo-1590483736622-39da8af75b93?q=80&w=400&auto=format&fit=crop',
            desc: "The ultimate spiritual reset. Pierces through deep energetic blocks."
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 0 80px' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '8px', fontSize: '0.9rem', textTransform: 'uppercase' }}>THE ALCHEMY</span>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginTop: '1rem' }}>Our Ingredients</h1>
                    <p style={{ maxWidth: '700px', margin: '1.5rem auto', color: 'var(--color-text-light)', lineHeight: 1.8 }}>
                        We believe in the intelligence of the whole plant. That's why we use raw minerals and whole botanicals—never extracts or lab-made fragrances.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {ingredients.map((ing, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.1)', textAlign: 'center' }}>
                            <div style={{ width: '120px', height: '120px', margin: '0 auto 2rem', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '10px' }}>
                                <img src={ing.img} alt={ing.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem', letterSpacing: '2px' }}>{ing.name}</h3>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                                {ing.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '6rem', backgroundColor: 'var(--color-dark)', padding: '4rem', color: '#fff', textAlign: 'center', borderRadius: '12px' }}>
                    <h3 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem' }}>Total Purity Standards</h3>
                    <p style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.8, lineHeight: 1.8 }}>
                        No Essential Oils | No Artificial Fragrance | No Synthetic Color | No Anti-caking Agents | No Machines
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IngredientsPage;
