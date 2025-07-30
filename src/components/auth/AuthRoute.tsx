
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { JSX } from 'react';

export default function AuthRoute({ children }: { children: JSX.Element }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }


    return currentUser ? <Navigate to="/" replace /> : children;
}
