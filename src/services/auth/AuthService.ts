import { jwtDecode } from 'jwt-decode';
import { User } from '../../types';
import { StorageAdapter } from '../storage/StorageAdapter';

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

const MOCK_ADMIN = {
  id: 'admin',
  email: 'admin@mail.com',
  password: '1234',
  name: 'Administrador',
  isAdmin: true,
};

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImlzQWRtaW4iOnRydWV9';

export class AuthService {
  private static TOKEN_KEY = '@barbershop:token';
  private static USERS_KEY = '@barbershop:users';

  constructor(private storage: StorageAdapter) {}

  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<string> {
    if (userData.email === MOCK_ADMIN.email) {
      throw new Error('E-mail indisponível');
    }

    const users = await this.storage.getItem<User[]>(AuthService.USERS_KEY) || [];
    
    const userExists = users.some(user => user.email === userData.email);
    if (userExists) {
      throw new Error('E-mail já cadastrado');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      createdAt: new Date()
    };

    await this.storage.setItem(AuthService.USERS_KEY, [...users, newUser]);
    
    const token = MOCK_TOKEN;
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    return token;
  }

  async login(email: string, password: string): Promise<string> {
    // Verifica primeiro se é o admin
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      localStorage.setItem(AuthService.TOKEN_KEY, MOCK_TOKEN);
      return MOCK_TOKEN;
    }

    const users = await this.storage.getItem<User[]>(AuthService.USERS_KEY) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const token = MOCK_TOKEN;
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    return token;
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? decoded.exp > currentTime : true;
    } catch {
      return false;
    }
  }

  static getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        isAdmin: decoded.isAdmin,
        createdAt: new Date()
      };
    } catch {
      return null;
    }
  }
}