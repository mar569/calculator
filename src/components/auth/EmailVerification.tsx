import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function EmailVerification() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {

                if (user.emailVerified) {

                    navigate('/login');
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Проверка электронной почты</h2>
            <p>Пожалуйста, проверьте свою почту и подтвердите адрес электронной почты.</p>
            <p>После подтверждения вы будете автоматически перенаправлены на страницу входа.</p>
        </div>
    );
}
