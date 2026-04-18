import React from 'react';

const PolicyLayout = ({ title, children }) => {
    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 20px 80px' }}>
            <div className="container" style={{ maxWidth: '800px', backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-dark)', borderBottom: '1px solid var(--color-gold)', paddingBottom: '1rem' }}>
                    {title}
                </h1>
                <div style={{ lineHeight: '1.8', color: 'var(--color-text-light)', fontSize: '1rem' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PolicyLayout;
