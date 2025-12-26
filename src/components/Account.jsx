import React from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Not logged in</div>;
    }

    return (
        <div className="container section-padding text-center">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>My Account</h2>
            <div style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                <p><strong>Username:</strong> {user.username}</p>
                {Object.entries(user).map(([key, value]) => {
                    if (key !== 'username') {
                        return <p key={key}><strong>{key}:</strong> {value}</p>;
                    }
                    return null;
                })}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p>Welcome back!</p>
                </div>
            </div>
        </div>
    );
};

export default Account;
