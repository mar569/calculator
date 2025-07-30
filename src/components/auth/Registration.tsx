import { useState } from 'react';
import { sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const usersSnapshot = await getDoc(doc(db, 'stats', 'users'));
            const userCount = usersSnapshot.exists() ? usersSnapshot.data().count : 0;

            if (userCount >= 2) {
                toast.error('Достигнуто максимальное количество администраторов');
                setLoading(false);
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                createdAt: serverTimestamp(),
                isVerified: false
            });

            await setDoc(doc(db, 'stats', 'users'), {
                count: userCount + 1
            }, { merge: true });

            toast.success('Регистрация успешна! Проверьте почту для подтверждения');
            navigate('/email-verification');
        } catch (error) {
            toast.error('Ошибка регистрации: ' + (error as Error).message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Ваше имя</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
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
                        minLength={6}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    );
}
