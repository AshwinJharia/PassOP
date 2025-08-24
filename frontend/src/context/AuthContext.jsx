import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            setUser(userData);
        }
    }, [token]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const data = await apiService.login(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ username: data.username }));
            setToken(data.token);
            setUser({ username: data.username });
            toast.success('Login successful!');
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, password) => {
        setLoading(true);
        try {
            await apiService.register(username, password);
            toast.success('Registration successful! Please login.');
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};