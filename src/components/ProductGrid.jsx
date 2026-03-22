import React from 'react';

const ProductGrid = ({ title, products }) => {
    return (
        <section className="section-padding container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
                <h2>{title}</h2>
                <a href="/shop" style={{ textDecoration: 'underline', fontStyle: 'italic' }}>View all</a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {products.map(product => (
                    <div key={product.id} style={{ textAlign: 'center', width: '350px' }}>
                        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '1rem', aspectRatio: '1/1' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            <span style={{
                                position: 'absolute', bottom: '10px', left: '10px',
                                backgroundColor: '#fff', padding: '5px 10px', fontSize: '0.8rem'
                            }}>
                                {product.category}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                        <p style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>{product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
