import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.message || 'Erreur de connexion');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      {errorMessage && <div className="auth-error">{errorMessage}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email" value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required placeholder="votre@email.com"
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password" value={formData.password}
            onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required placeholder="••••••••"
          />
        </div>
        <button type="submit" className="auth-btn" disabled={isLoading}>
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <div className="auth-footer">
        <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;