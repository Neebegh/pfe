import React, { useState, useEffect } from 'react';
import './ReportPopup.css';

const ReportPopup = ({ isOpen, onClose, product, user }) => {
  const [issueType, setIssueType] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({ issueType: '', comment: '' });

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      issueType: issueType ? '' : 'Veuillez sélectionner un type de problème.'
    }));
  }, [issueType]);

  useEffect(() => {
    setErrors(prev => ({
      ...prev,
      comment: comment.trim() ? '' : 'Le commentaire ne peut pas être vide.'
    }));
  }, [comment]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issueType || !comment.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          productImage: product.image_url,
          userEmail: user.email,
          issueType,
          comment
        })
      });

      if (response.ok) {
        setSuccessMessage('✅ Signalement envoyé ! Merci.');
        setIssueType('');
        setComment('');
        setErrors({ issueType: '', comment: '' });

        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.message || 'Erreur lors de l’envoi.');
      }
    } catch (err) {
      console.error('Erreur API signalement :', err);
      alert('❌ Erreur serveur.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>✖</button>
        <h2>🚩 Signaler un problème</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type de problème :</label>
            <select value={issueType} onChange={(e) => setIssueType(e.target.value)}>
              <option value="">-- Choisissez --</option>
              <option value="Taille trop petite">Taille trop petite</option>
              <option value="Taille trop grande">Taille trop grande</option>
              <option value="Couleur différente">Couleur différente</option>
              <option value="Matière mauvaise qualité">Matière mauvaise qualité</option>
              <option value="Article non conforme">Article non conforme</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.issueType && <p className="error-message">{errors.issueType}</p>}
          </div>

          <div className="form-group">
            <label>Commentaire :</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Décrivez votre problème..."
            />
            {errors.comment && <p className="error-message">{errors.comment}</p>}
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="popup-submit-btn" disabled={!issueType || !comment.trim()}>
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPopup;
