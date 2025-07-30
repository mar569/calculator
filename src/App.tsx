
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import FinancePage from './pages/FinancePage';
import ReportsPage from './pages/ReportsPage';
import IncomePage from './pages/IncomePage';
import SettingsPage from './pages/SettingsPage';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from './components/Page';
import { AuthProvider } from './context/AuthProvider';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import RoutePage from './components/auth/RoutePage';
import { useAuth } from './context/AuthContext';

function AppRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>; // Можно добавить индикатор загрузки
  }

  return (
    <Routes>
      {/* Если пользователь не аутентифицирован, он увидит страницу регистрации */}
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />

      {/* Если пользователь аутентифицирован, перенаправляем на главную страницу */}
      <Route path="/" element={currentUser ? <RoutePage><DashboardPage /></RoutePage> : <Navigate to="/register" replace />} />
      <Route path="/finance" element={currentUser ? <RoutePage><FinancePage /></RoutePage> : <Navigate to="/register" replace />} />
      <Route path="/income" element={currentUser ? <RoutePage><IncomePage /></RoutePage> : <Navigate to="/register" replace />} />
      <Route path="/reports" element={currentUser ? <RoutePage><ReportsPage /></RoutePage> : <Navigate to="/register" replace />} />
      <Route path="/settings" element={currentUser ? <RoutePage><SettingsPage /></RoutePage> : <Navigate to="/register" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Page>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <AppRoutes />
        </Page>
      </ThemeProvider>
    </AuthProvider>
  );
}
