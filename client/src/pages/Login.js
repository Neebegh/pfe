import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      // ✅ Redirection directe selon le rôle
      if (result.user?.is_admin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert(result.error || 'Erreur de connexion');
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="auth-btn" disabled={isLoading}>
          Se connecter {isLoading && <span className="auth-loading"></span>}
        </button>
      </form>

      <div className="auth-footer">
        <span>Pas encore de compte ? </span>
        <Link to="/register" className="auth-link">Créer un compte</Link>
      </div>
    </div>
  );
};

export default Login;
