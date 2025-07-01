/* eslint-disable @typescript-eslint/no-explicit-any */
// // src/hooks/useDashboardData.ts
// import { useState, useEffect } from 'react';
// import type { Command } from '../types/command';
// import { useAuth } from './AuthContext';

// export const useDashboardData = () => {
//   const [commands, setCommands] = useState<Command[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const { api } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const commandsResponse = await api.get<Command[]>('/commands');
//         setCommands(commandsResponse.data);
//       } catch (err) {
//         setError('Falha ao carregar dados do dashboard.');
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [api]);

//   return { commands, loading, error };
// };

// src/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import type { Command } from '../types/command';
import { useAuth } from './AuthContext';

export const useDashboardData = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { api, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get token from user
        const token = user?.token;
        console.log('Token for request:', token);

        if (!token) {
          throw new Error('No token available. Please log in.');
        }

        // Make request with explicit Authorization header
        const commandsResponse = await api.get<Command[]>('/commands', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Commands Response:', commandsResponse.data);
        setCommands(commandsResponse.data);
      } catch (err: any) {
        const errorMessage = err.response
          ? `Erro ${err.response.status}: ${
              err.response.data?.message || err.message
            }`
          : 'Falha ao carregar dados do dashboard. Verifique se o servidor está ativo.';
        setError(errorMessage);
        console.error('Fetch error:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
      } finally {
        setLoading(false);
      }
    };

    console.log('Starting fetchData');
    fetchData();
  }, [api, user]);

  return { commands, loading, error };
};
