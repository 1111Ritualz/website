import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        checkUserSession();
    }, []);

    const checkUserSession = async () => {
        try {
            await authService.getSession();
            const attributes = await authService.getUserAttributes();
            // Combine session info if needed, for now just storing attributes as "user"
            setUser({ ...attributes, username: authService.getCurrentUser().getUsername() });
        } catch (error) {
            console.log("No current session", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        await authService.login(email, password);
        await checkUserSession(); // Update state after login
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const signUp = async (username, email, password) => {
        return await authService.signUp(username, email, password);
    }

    const confirmSignUp = async (email, code) => {
        return await authService.confirmSignUp(email, code);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signUp, confirmSignUp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
