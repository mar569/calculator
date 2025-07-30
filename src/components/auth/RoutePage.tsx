
import { Navigate } from 'react-router-dom';

import type { JSX } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RoutePage({ children }: { children: JSX.Element }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
