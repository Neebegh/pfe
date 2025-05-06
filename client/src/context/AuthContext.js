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
        return {
          email: decoded.email,
          name: decoded.username,
          is_admin: decoded.is_admin,
          token
        };
      } catch (error) {
        localStorage.removeItem('authToken');
        return null;
      }
    }
    return null;
  });

  const register = useCallback(async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });

      // facultatif : faire login auto ici si le backend renvoie un token
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

      const { token, user: userData } = response.data;
      localStorage.setItem('authToken', token);

      setUser({
        email: userData.email,
        name: userData.username,
        is_admin: userData.is_admin,
        token
      });

      return { success: true, user: userData };
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
