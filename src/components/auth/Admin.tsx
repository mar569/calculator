
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';


interface Registration {
    id: string;
    email: string;
    password: string;
    status: string;
}

export default function AdminPanel() {
    const [requests, setRequests] = useState<Registration[]>([]);
    const [user, setUser] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(
                collection(db, 'registrationRequests'),
                where('status', '==', 'pending')
            );
            const snapshot = await getDocs(q);
            setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration)));

            const usersQuery = query(collection(db, 'users'));
            const usersSnapshot = await getDocs(usersQuery);
            setUser(usersSnapshot.size);
        };

        fetchData();
    }, []);

    const approveRequest = async (request: Registration) => {
        if (user >= 2) {
            alert('Доступ разрешен только администраторам');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                request.email,
                request.password
            );

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email: request.email,
                createdAt: serverTimestamp(),
                isAdmin: false
            });

            await updateDoc(doc(db, 'registrationRequests', request.id), {
                status: 'approved',
                approvedAt: serverTimestamp()
            });

            setRequests(requests.filter(req => req.id !== request.id));
            setUser(prev => prev + 1);
        } catch (error) {
            console.error('Ошибка при одобрении:', error);
        }
    };

    const rejectRequest = async (id: string) => {
        await deleteDoc(doc(db, 'registrationRequests', id));
        setRequests(requests.filter(req => req.id !== id));
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Админ Панель</h1>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Ожидающие запросы на регистрацию</h2>
                {requests.length === 0 ? (
                    <p>Нет ожидающих запросов</p>
                ) : (
                    <div className="space-y-2">
                        {requests.map(request => (
                            <div key={request.id} className="flex justify-between items-center p-3 border rounded">
                                <span>{request.email}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => approveRequest(request)}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Одобрить
                                    </button>
                                    <button
                                        onClick={() => rejectRequest(request.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
