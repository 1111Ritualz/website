import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(identifier, password);
            navigate('/');
        } catch (err) {
            setError(err.message || "Failed to login");
            if (err.code === 'UserNotConfirmedException') {
                // If using email aliases, this might need refinement, but for now redirecting with identifier as username usually works if it's the username
                // Or user enters email. We'll pass it as 'username' param which our Verify page expects
                navigate(`/verify?username=${encodeURIComponent(identifier)}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section-padding" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>Login</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1rem' }}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="text-center" style={{ marginTop: '1rem' }}>
                <p>
                    <Link to="/forgot-password" style={{ color: 'var(--color-dark)', textDecoration: 'underline' }}>Forgot Password?</Link>
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--color-dark)', fontWeight: 'bold' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
