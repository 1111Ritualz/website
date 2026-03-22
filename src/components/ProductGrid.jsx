import React from 'react';

const ProductGrid = ({ title, products, id }) => {
    return (
        <section id={id} className="container" style={{ padding: '3rem 2rem' }}>
            <style>{`
                .product-grid-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2rem;
                    justify-content: center;
                }
                .product-card {
                    text-align: center;
                    width: 350px;
                }
                @media (max-width: 480px) {
                    .product-card {
                        width: 100%;
                    }
                }
            `}</style>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
                <h2>{title}</h2>
                <a href="/shop" style={{ textDecoration: 'underline', fontStyle: 'italic' }}>View all</a>
            </div>

            <div className="product-grid-wrapper">
                {products.map(product => (
                    <div key={product.id} className="product-card">
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
                        {product.price && (
                            <p style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>{product.price}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
