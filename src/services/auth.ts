import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
}

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
}

const MOCK_USER = {
  email: 'igor@mail.com',
  password: '1234',
  name: 'Igor',
  id: '1'
};

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJpZ29yQG1haWwuY29tIiwibmFtZSI6Iklnb3IifQ.kqn0bh6R0Q';

export class AuthService {
  private static TOKEN_KEY = '@barbershop:token';

  static async login(email: string, password: string): Promise<string> {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      localStorage.setItem(this.TOKEN_KEY, MOCK_TOKEN);
      return MOCK_TOKEN;
    }
    
    throw new Error('Credenciais inválidas');
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
        name: decoded.name
      };
    } catch {
      return null;
    }
  }
}