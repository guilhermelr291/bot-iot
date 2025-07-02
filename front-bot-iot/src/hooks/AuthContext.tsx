/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-refresh/only-export-components */
// // src/contexts/AuthContext.tsx
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface AuthContextType {
//   user: { token: string } | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<{ token: string } | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUser({ token });
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await axios.post<{ token: string }>(
//         'http://localhost:5050/login',
//         {
//           email,
//           password,
//         }
//       );
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       setUser({ token });
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// src/contexts/AuthContext.tsx

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios, { type AxiosInstance } from 'axios';

// interface AuthContextType {
//   user: { token: string } | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   api: AxiosInstance;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<{ token: string } | null>(null);
//   const navigate = useNavigate();

//   // Create Axios instance
//   const api = axios.create({
//     baseURL: 'http://localhost:5050',
//   });

//   // Add JWT token to requests
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUser({ token });
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const response = await api.post<{ token: string }>('/login', {
//         email,
//         password,
//       });
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser({ token });
//       return true;
//     } catch (error) {
//       console.error('Login error:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete api.defaults.headers.common['Authorization'];
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, api }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { type AxiosInstance } from 'axios';

interface AuthContextType {
  user: { token: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  api: AxiosInstance;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Initial token check:', token);
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<{ token: string }>('/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser({ token });
      console.log('Login successful, token:', token);
      return true;
    } catch (error: any) {
      console.error('Login error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
