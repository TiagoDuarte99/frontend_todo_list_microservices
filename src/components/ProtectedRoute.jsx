import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auths';

const ProtectedRoute = ({ element }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para controlar se ainda está carregando a autenticação

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authStatus = await isAuthenticated(); // Aguarda o resultado da função isAuthenticated
        console.log('authstatus', authStatus);
        setAuthenticated(authStatus);
      } catch (error) {
        console.error('Error checking authentication status:', error);
      } finally {
        setLoading(false); // Autenticação completa, carregamento finalizado
      }
    };

    checkAuthStatus();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;