/* eslint-disable no-unused-vars */
import {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

import axios from '../services/api';

interface User {
  id: number,
  name: number,
  login: number,
}

interface Credentials {
  login: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  token: string;
  signIn(credentials: Credentials): Promise<boolean>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode,
}

interface ResponseLogin {
  user: User;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string>(() => {
    const storedToken = String(localStorage.getItem('@Aqm:token'));

    if (storedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    }

    return storedToken;
  });
  const [user, setUser] = useState<User | null>(
    JSON.parse(String(localStorage.getItem('@Aqm:user'))),
  );

  const signIn = useCallback(
    async ({ login, password }: Credentials): Promise<boolean> => {
      try {
        const response = await axios.post<ResponseLogin>('session', {
          login,
          password,
        });

        localStorage.setItem('@Aqm:token', response.data.token);
        localStorage.setItem('@Aqm:user', JSON.stringify(response.data.user));

        setUser(() => response.data.user);
        setToken(() => response.data.token);

        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

        return true;
      } catch (error) {
        return false;
      }
    },
    [],
  );

  const signOut = useCallback((): void => {
    localStorage.removeItem('@Aqm:token');
    localStorage.removeItem('@Aqm:user');
    localStorage.removeItem('@Aqm:dateShowBirthday');

    setUser(() => null);
    setToken(() => '');
  }, []);

  const authContextProviderValue = useMemo(() => ({
    user,
    token,
    signIn,
    signOut,
  }), []);

  return (
    <AuthContext.Provider
      value={authContextProviderValue}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextData => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};
