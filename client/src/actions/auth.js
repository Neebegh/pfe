import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';

export const registerUser = async (userData) => {
  try {
    const res = await axios.post('/api/auth/register', userData);
    const { token } = res.data;
    
    // Stocker le token dans localStorage
    localStorage.setItem('token', token);
    setAuthToken(token);
    
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axios.post('/api/auth/login', userData);
    const { token } = res.data;
    
    localStorage.setItem('token', token);
    setAuthToken(token);
    
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};