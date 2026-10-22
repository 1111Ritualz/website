import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="container section-padding" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '120px' }}>
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
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '0.8rem', paddingRight: '2.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px'
                        }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                </div>
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
