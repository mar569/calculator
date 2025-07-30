
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
import { useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadimgScreen';

function AppRoutes() {
  const { currentUser, loading } = useAuth();


  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={currentUser ? <DashboardPage /> : <Navigate to="/login" replace />} />
      <Route path="/finance" element={currentUser ? <FinancePage /> : <Navigate to="/login" replace />} />
      <Route path="/income" element={currentUser ? <IncomePage /> : <Navigate to="/login" replace />} />
      <Route path="/reports" element={currentUser ? <ReportsPage /> : <Navigate to="/login" replace />} />
      <Route path="/settings" element={currentUser ? <SettingsPage /> : <Navigate to="/login" replace />} />
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
