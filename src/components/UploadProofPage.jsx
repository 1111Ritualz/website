import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UploadProofPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const payload = location.state || { orderId: 'ORD-XXXXX', totalAmount: 0 };
    
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUploadNow = () => {
        if (!file) return;
        setLoading(true);

        // Mock S3 upload and API call to update order
        setTimeout(() => {
            setLoading(false);
            // In a real app, this would get a pre-signed URL and upload, then update the DB.
            navigate('/orders');
        }, 1500);
    };

    const handleUploadLater = () => {
        // Keep order PENDING
        navigate('/orders');
    };

    const handleCancelOrder = () => {
        // Mock cancel order API
        navigate(`/product/${payload.productId || 1}`);
    };

    return (
        <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '120px 2rem 4rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-dark)' }}>Upload Payment Proof</h1>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>Order ID: <strong>{payload.orderId}</strong></p>
                
                <div style={{ marginBottom: '2rem' }}>
                    <label 
                        style={{ 
                            display: 'block', padding: '2rem', border: '2px dashed #ddd', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'var(--color-cream)'
                        }}
                    >
                        <span style={{ color: 'var(--color-dark)', fontWeight: 'bold' }}>{file ? 'Change Image' : 'Select Image'}</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    </label>
                </div>

                {preview && (
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ marginBottom: '1rem', color: 'var(--color-dark)', fontWeight: 'bold' }}>Preview:</p>
                        <img src={preview} alt="Proof preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button 
                        onClick={handleUploadNow}
                        disabled={!file || loading}
                        style={{ padding: '1rem', backgroundColor: 'var(--color-dark)', border: 'none', color: 'white', cursor: (!file || loading) ? 'not-allowed' : 'pointer', opacity: (!file || loading) ? 0.7 : 1, transition: 'all 0.3s' }}
                    >
                        {loading ? 'Uploading...' : 'Upload Now'}
                    </button>
                    
                    <button 
                        onClick={handleUploadLater}
                        style={{ padding: '1rem', backgroundColor: 'transparent', border: '1px solid var(--color-dark)', color: 'var(--color-dark)', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                        Upload Later
                    </button>

                    <button 
                        onClick={handleCancelOrder}
                        style={{ padding: '1rem', backgroundColor: 'transparent', border: 'none', color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Cancel Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadProofPage;
