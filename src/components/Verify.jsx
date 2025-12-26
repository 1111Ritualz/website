import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify = () => {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { confirmSignUp } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const usernameParam = searchParams.get('username');
        if (usernameParam) setUsername(usernameParam);
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await confirmSignUp(username, code);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to verify");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container section-padding text-center">
                <h2>Verification Successful!</h2>
                <p>Redirecting to login...</p>
            </div>
        )
    }

    return (
        <div className="container section-padding" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>Verify Account</h2>
            <p className="text-center" style={{ marginBottom: '1.5rem' }}>Please enter the code sent to your email.</p>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Verification Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1rem' }}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
        </div>
    );
};

export default Verify;
