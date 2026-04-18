import { Link } from 'react-router-dom';

const ProductGrid = ({ title, products, id }) => {
    return (
        <section id={id} style={{ padding: '6rem 0', backgroundColor: 'var(--color-cream)' }}>
            <div className="container">
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
                    text-decoration: none;
                    color: inherit;
                    display: block;
                }
                @media (max-width: 480px) {
                    .product-card {
                        width: 100%;
                    }
                }
            `}</style>
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <p style={{ color: 'var(--color-gold)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        Shop
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{title}</h2>
                    <div style={{ width: '50px', height: '2px', backgroundColor: 'var(--color-gold)', margin: '1.5rem auto' }} />
                    {/* <a href="/shop" style={{ textDecoration: 'underline', fontStyle: 'italic' }}>View all</a> */}
                </div>

                <div className="product-grid-wrapper">
                    {products.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product-card">
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
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{product.name}</h3>
                            <p style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>₹ 1,099</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
