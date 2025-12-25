import React from 'react';
import { collections } from '../data';

const CollectionList = () => {
    return (
        <section className="section-padding" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                <h2 className="text-center">Our Collection</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {collections.map(collection => (
                        <div key={collection.id} style={{ position: 'relative', height: '350px', overflow: 'hidden', cursor: 'pointer' }}>
                            <img
                                src={collection.image}
                                alt={collection.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                            />
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                textAlign: 'center', color: '#fff', width: '100%'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', color: '#fff', letterSpacing: '2px', textTransform: 'uppercase' }}>{collection.title}</h3>
                                <span className="btn btn-outline" style={{ marginTop: '1rem', color: '#fff', borderColor: '#fff' }}>Shop Now</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionList;
