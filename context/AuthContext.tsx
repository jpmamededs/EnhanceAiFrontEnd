import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/authService';
import api from '@/services/api';

type User = {
  username: string;
  email: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Recupera o usuário salvo no AsyncStorage ao abrir o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          // aplica o token no axios globalmente
          api.defaults.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // 🔐 Login
  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    // espera algo como: { token: "...", username: "...", email: "..." }
    const userData: User = {
      username: data.username,
      email: data.email,
      token: data.token,
    };

    // salva no storage
    await AsyncStorage.setItem('@user', JSON.stringify(userData));

    // aplica token globalmente
    api.defaults.headers.Authorization = `Bearer ${userData.token}`;

    setUser(userData);
  };

  // 📝 Cadastro
  const register = async (username: string, email: string, password: string) => {
    await authService.register(username, email, password);
    await login(email, password); // login automático após cadastro
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.log('Logout error:', e);
    } finally {
      await AsyncStorage.removeItem('@user');
      setUser(null);
      delete api.defaults.headers.Authorization;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
