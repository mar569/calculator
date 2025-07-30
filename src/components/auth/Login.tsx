// src/components/auth/Login.tsx
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Вход выполнен успешно');

            // Приветствие в зависимости от логина
            if (email === 'efimin01@icloud.com') {
                toast.info('Привет, Кирилл!');
            } else if (email === 'alinkaovsefimina@bk.ru') {
                toast.info('Привет, Аиночка!');
            }

            if (rememberMe) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }

            navigate('/');
        } catch (error) {
            toast.error('Ошибка входа: ' + (error as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center h-full mt-14">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md neumorphism neumorphism-card">
                <h2 className="text-2xl text-center mb-4">Вход</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1">Логин</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded neumorphism neumorphism-input"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded neumorphism neumorphism-input"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="mr-2"
                        />
                        <label>Запомнить меня</label>
                    </div>
                    <button
                        type="submit"
                        className="neumorphism neumorphism-button w-full bg-[#efe1f0] text-white p-2 rounded hover:bg-blue-600"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}
