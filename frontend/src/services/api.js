const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    }

    // Auth methods
    async register(username, password) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    }

    async login(username, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    }

    // Password methods
    async getPasswords() {
        return this.request('/passwords');
    }

    async savePassword(passwordData) {
        return this.request('/passwords', {
            method: 'POST',
            body: JSON.stringify(passwordData),
        });
    }

    async deletePassword(id) {
        return this.request('/passwords', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });
    }
}

export default new ApiService();