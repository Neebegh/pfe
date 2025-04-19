// src/context/AuthContext.js
import React, { createContext, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return { email: decoded.email, token };
      } catch (error) {
        localStorage.removeItem('authToken');
        return null;
      }
    }
    return null;
  });

  const register = useCallback(async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      const decoded = jwtDecode(token);
      setUser({ email: decoded.email, token });
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur lors de l’inscription' 
      };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      const decoded = jwtDecode(token);
      setUser({ email: decoded.email, token });
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Email ou mot de passe incorrect' 
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Le hook manquant !
export const useAuth = () => useContext(AuthContext);
