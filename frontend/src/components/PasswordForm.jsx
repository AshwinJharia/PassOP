import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PasswordForm = ({ onSave, onCancel, editingPassword }) => {
    const [form, setForm] = useState(editingPassword || { site: '', username: '', password: '' });
    const passwordRef = useRef();
    const eyeRef = useRef();

    useEffect(() => {
        if (editingPassword) {
            setForm(editingPassword);
        } else {
            setForm({ site: '', username: '', password: '' });
        }
    }, [editingPassword]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const success = await onSave({ ...form, id: form.id || uuidv4() });
            if (success) {
                setForm({ site: '', username: '', password: '' });
            }
        }
    };

    const togglePasswordVisibility = () => {
        const isPassword = passwordRef.current.type === 'password';
        passwordRef.current.type = isPassword ? 'text' : 'password';
        eyeRef.current.src = isPassword ? 'icons/eyecross.png' : 'icons/eye.png';
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col p-4 text-black gap-8 items-center">
            <input
                value={form.site}
                onChange={handleChange}
                placeholder="Enter service/website URL"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
                name="site"
                required
            />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                <input
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter Username/Email"
                    className="rounded-full border border-green-500 w-full md:w-2/5 p-4 py-1"
                    type="text"
                    name="username"
                    required
                />
                <div className="relative w-full md:w-3/5">
                    <input
                        ref={passwordRef}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter Password/API Key"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="password"
                        name="password"
                        required
                    />
                    <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={togglePasswordVisibility}>
                        <img ref={eyeRef} className="p-1" width={26} src="icons/eye.png" alt="toggle visibility" />
                    </span>
                </div>
            </div>
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
                >
                    <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                    {editingPassword ? 'Update' : 'Save'}
                </button>
                {editingPassword && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 hover:bg-gray-300 rounded-full px-8 py-2 w-fit border border-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default PasswordForm;