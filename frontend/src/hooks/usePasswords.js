import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export const usePasswords = () => {
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    const fetchPasswords = async () => {
        if (!isAuthenticated) return;
        
        setLoading(true);
        try {
            const data = await apiService.getPasswords();
            setPasswords(data);
        } catch (error) {
            if (error.message.includes('token')) {
                logout();
            } else {
                toast.error('Failed to fetch credentials');
            }
        } finally {
            setLoading(false);
        }
    };

    const savePassword = async (passwordData) => {
        try {
            await apiService.savePassword(passwordData);
            await fetchPasswords();
            toast.success('Credentials saved!');
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    const deletePassword = async (id) => {
        if (!confirm('Do you really want to delete these credentials?')) return;
        
        try {
            await apiService.deletePassword(id);
            await fetchPasswords();
            toast.success('Credentials deleted!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchPasswords();
    }, [isAuthenticated]);

    return {
        passwords,
        loading,
        savePassword,
        deletePassword,
        refreshPasswords: fetchPasswords,
    };
};