// src/hooks/useLogin.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email ou senha incorretos.');
    }
    setIsLoading(false);
  };

  return { handleLogin, isLoading, error };
};
