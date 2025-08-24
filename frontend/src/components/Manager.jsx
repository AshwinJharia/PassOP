import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePasswords } from '../hooks/usePasswords';
import PasswordForm from './PasswordForm';
import PasswordTable from './PasswordTable';
import AuthPage from '../pages/AuthPage';

const Manager = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { passwords, savePassword, deletePassword } = usePasswords();
    const [editingPassword, setEditingPassword] = useState(null);
    const [formKey, setFormKey] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            setEditingPassword(null);
            setFormKey(prev => prev + 1);
        }
    }, [isAuthenticated]);

    const handleEdit = (password) => {
        setEditingPassword(password);
    };

    const handleCancel = () => {
        setEditingPassword(null);
    };

    const handleSave = async (passwordData) => {
        const { _id, createdAt, updatedAt, userId, ...cleanData } = passwordData;
        const success = await savePassword(cleanData);
        if (success) {
            setEditingPassword(null);
        }
        return success;
    };


    if (!isAuthenticated) {
        return <AuthPage />;
    }
    
    return (
        <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className=" p-3 md:mycontainer min-h-[88.2vh] ">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className='text-4xl text font-bold text-center'>
                            <span className='text-green-500'> &lt;</span>
                            <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                        </h1>
                        <p className='text-green-900 text-lg text-center'>Your Secure Credentials Manager</p>
                    </div>
                    <div className="text-right">
                        <p className="text-green-700">Welcome, {user?.username}!</p>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <PasswordForm key={formKey} onSave={handleSave} onCancel={handleCancel} editingPassword={editingPassword} />

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Credentials</h2>
                    <PasswordTable 
                        passwords={passwords} 
                        onEdit={handleEdit} 
                        onDelete={deletePassword} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Manager
