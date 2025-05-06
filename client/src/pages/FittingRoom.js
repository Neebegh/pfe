import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar3D from '../components/ui/Avatar3D';
import './FittingRoom.css';

const FittingRoom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const productId = state?.productId;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [profileType, setProfileType] = useState('');
  const [recommendedSize, setRecommendedSize] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) {
      navigate('/products');
    }
  }, [navigate, productId]);

  const handleSizeRecommendation = (h, w) => {
    const bmi = w / Math.pow(h / 100, 2);
    if (bmi < 18.5) return { size: 'XS', profile: 'Silhouette très fine' };
    if (bmi < 23) return { size: 'S', profile: 'Silhouette mince' };
    if (bmi < 27) return { size: 'M', profile: 'Corpulence moyenne' };
    if (bmi < 32) return { size: 'L', profile: 'Silhouette sportive' };
    return { size: 'XL', profile: 'Silhouette ronde' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError('❌ Vous devez être connecté pour faire un essayage.');
      return;
    }

    if (!height || !weight || !waist) {
      setError('Merci de remplir toutes les mesures.');
      return;
    }

    if (height < 100 || weight < 30 || waist < 40) {
      setError('Merci de vérifier vos mesures.');
      return;
    }

    const size = handleSizeRecommendation(parseFloat(height), parseFloat(weight));
    setRecommendedSize(size.size);
    setProfileType(size.profile);

    const fittingDone = JSON.parse(localStorage.getItem('fittingDone')) || {};
    fittingDone[productId] = true;
    localStorage.setItem('fittingDone', JSON.stringify(fittingDone));

    setIsSubmitted(true);
    setError('');
  };

  const handleBack = () => {
    sessionStorage.setItem('fittingSuccess', 'true');
    navigate(-1);
  };

  const handleGoToAvatar = () => {
    navigate('/create-avatar');
  };

  return (
    <div className="fitting-room-container">
      <h1>🎯 Salle d'Essayage Virtuel</h1>

      {!user && (
        <div className="alert-connection">
          🔒 Vous devez être connecté pour effectuer un essayage.
          <button onClick={() => navigate('/login')} className="btn-login">
            Se connecter
          </button>
        </div>
      )}

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="fitting-form">
          <input
            type="number"
            placeholder="Votre taille (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            disabled={!user}
          />
          <input
            type="number"
            placeholder="Votre poids (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            disabled={!user}
          />
          <input
            type="number"
            placeholder="Tour de taille (cm)"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            disabled={!user}
          />
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn-validate" disabled={!user}>
            Valider l'essayage ✅
          </button>

          <button type="button" className="btn-avatar" onClick={handleGoToAvatar}>
            👤 Créer mon avatar
          </button>
        </form>
      ) : (
        <div className="result-section success-animation">
          <h2 className="success-text">✅ Profil détecté avec succès !</h2>
          <div style={{ marginBottom: '1rem' }}>
            <Avatar3D profile={profileType} />
          </div>
          <h3>🔎 Taille recommandée : <span>{recommendedSize}</span></h3>
          <p>🧠 Type de morphologie : <strong>{profileType}</strong></p>

          <div className="btn-group">
            <button onClick={handleBack} className="btn-back">🔙 Retour aux produits</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FittingRoom;
