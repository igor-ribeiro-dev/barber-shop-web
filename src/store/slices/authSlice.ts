import { StateCreator } from 'zustand';
import { AuthService } from '../../services/auth';

export interface AuthSlice {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuthenticated: AuthService.isAuthenticated(),
  user: AuthService.getCurrentUser(),
  
  login: async (email: string, password: string) => {
    await AuthService.login(email, password);
    set({
      isAuthenticated: true,
      user: AuthService.getCurrentUser(),
    });
  },
  
  logout: () => {
    AuthService.logout();
    set({
      isAuthenticated: false,
      user: null,
    });
    window.location.href = '/';
  },
  
  checkAuth: () => {
    set({
      isAuthenticated: AuthService.isAuthenticated(),
      user: AuthService.getCurrentUser(),
    });
  },
});