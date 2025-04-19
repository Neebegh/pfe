import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:5000/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        } else {
          setError('Accès non autorisé');
          window.location.href = '/login';
        }
      })
      .catch(err => {
        console.error(err);
        setError('Erreur lors du chargement du profil');
        window.location.href = '/login';
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 🔐 Supprime le token
    window.location.href = '/login'; // 🔄 Redirection
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Bienvenue {user.username} ! 🎉</p>
          <button onClick={handleLogout}>Se déconnecter</button>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Dashboard;
