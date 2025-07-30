import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState<{ name: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data() as { name: string });
                }
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                {userData?.name ? `Привет, ${userData.name}!` : 'Добро пожаловать!'}
            </h2>
        </div>
    );
}
