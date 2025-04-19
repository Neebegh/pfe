import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        alert('Connexion réussie 🎉');
        localStorage.setItem('token', data.token);
        // Redirige vers le tableau de bord ou une autre page
        navigate('/dashboard');
      } else {
        alert(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur réseau :', error);
      alert('Erreur de connexion au serveur.');
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
          Se connecter
          {isLoading && <span className="auth-loading"></span>}
        </button>
      </form>
    </div>
  );
};

export default Login;

