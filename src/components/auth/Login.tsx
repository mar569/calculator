import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                toast.warning('Email не подтвержден. Пожалуйста, проверьте вашу почту.');
                return;
            }
            toast.success('Вход выполнен успешно');
            navigate('/');
        } catch (error) {
            toast.error('Ошибка входа: ' + (error as Error).message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-amber-100">
            <h2 className="text-2xl font-bold mb-4">Вход</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}
