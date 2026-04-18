import React from 'react';

const Blogs = () => {
    const blogPosts = [
        {
            title: "Why Cleansing Your Energy is as Important as Cleansing Your Skin",
            date: "April 15, 2026",
            excerpt: "Understanding the invisible weight we carry from social interactions, digital noise, and stress..."
        },
        {
            title: "The Science of Salt Water and Negative Ions",
            date: "April 10, 2026",
            excerpt: "How mineral-rich water interaction can physically lower cortisol levels and calm the nervous system..."
        },
        {
            title: "Ancient Rituals for Modern Burnout",
            date: "April 5, 2026",
            excerpt: "Discovering how 3,000-year-old Ayurvedic practices found their place in my busy city life..."
        }
    ];

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 0 80px' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span style={{ color: 'var(--color-gold)', letterSpacing: '8px', fontSize: '0.9rem', textTransform: 'uppercase' }}>JOURNAL</span>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginTop: '1rem' }}>Ritual Blogs</h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {blogPosts.map((post, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
                            <p style={{ color: 'var(--color-gold)', fontSize: '0.8rem', marginBottom: '1rem', letterSpacing: '1px' }}>{post.date}</p>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h3>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                {post.excerpt}
                            </p>
                            {/* <span style={{ color: 'var(--color-gold)', borderBottom: '1px solid var(--color-gold)', fontSize: '0.9rem', cursor: 'pointer' }}>Read Ritual</span> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
