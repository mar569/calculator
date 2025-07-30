// src/components/Registration.tsx
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Registration() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);

            await addDoc(collection(db, 'registrationRequests'), {
                email,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            toast.success('Регистрация прошла успешно. Письмо подтверждения отправлено на вашу почту.');
            setEmail('');
            setPassword('');
        } catch {
            toast.error('Что-то пошло не так: ');

        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-amber-100">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-md"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}
