import type { User } from 'firebase/auth';
import { createContext, useContext } from 'react';

interface IAuthContextType {
  currentUser: User | null;
  loading: boolean;
  isEmailVerified: boolean;
}

const AuthContext = createContext<IAuthContextType>({
  currentUser: null,
  loading: true,
  isEmailVerified: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
