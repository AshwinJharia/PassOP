import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const [authForm, setAuthForm] = useState({ username: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);
    const { login, register, loading } = useAuth();

    const handleChange = (e) => {
        setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = isLogin 
            ? await login(authForm.username, authForm.password)
            : await register(authForm.username, authForm.password);
        
        if (success && !isLogin) {
            setIsLogin(true);
        }
        setAuthForm({ username: '', password: '' });
    };

    return (
        <div className="p-3 md:mycontainer min-h-[88.2vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={authForm.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-green-500 rounded-full"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={authForm.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-green-500 rounded-full"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-400 hover:bg-green-300 rounded-full px-8 py-3 border border-green-900 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                    </button>
                </form>
                <p className="text-center mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-green-600 hover:underline ml-1"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;