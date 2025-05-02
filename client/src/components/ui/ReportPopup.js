import React, { useState } from 'react';
import './ReportPopup.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

const ReportPopup = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation pour suppression
  const [reason, setReason] = useState(''); // Raison de suppression
  const [errorMessage, setErrorMessage] = useState(''); // Message d'erreur si la raison est vide

  if (!isOpen) return null;

  // Formulaire de signalement
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!issueType || !comment.trim()) {
      alert('Merci de remplir tous les champs.');
      return;
    }

    const reports = JSON.parse(localStorage.getItem('reports')) || [];
    const newReport = {
      issueType,
      comment,
      date: new Date().toISOString(),
    };

    localStorage.setItem('reports', JSON.stringify([...reports, newReport]));

    setSuccessMessage('✅ Signalement envoyé ! Merci.');
    setIssueType('');
    setComment('');

    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 2000);
  };

  // Confirmation pour suppression d'avis
  const handleDelete = () => {
    if (!reason.trim()) {
      setErrorMessage('Veuillez fournir une raison pour la suppression.');
      return;
    }

    // Logique de suppression
    alert('Avis supprimé avec succès !');
    setShowConfirmation(false); // Cacher la fenêtre de confirmation après suppression
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>✖</button>
        <h2>🚩 Signaler un problème</h2>

        {/* Formulaire pour signalement */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type de problème :</label>
            <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required>
              <option value="">-- Choisissez --</option>
              <option value="Taille trop petite">Taille trop petite</option>
              <option value="Taille trop grande">Taille trop grande</option>
              <option value="Couleur différente">Couleur différente</option>
              <option value="Matière mauvaise qualité">Matière mauvaise qualité</option>
              <option value="Article non conforme">Article non conforme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="form-group">
            <label>Commentaire :</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Décrivez votre problème..."
              required
            />
          </div>

          <button type="submit" className="popup-submit-btn">Envoyer</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>

        {/* Confirmation pour supprimer un avis */}
        <button className="delete-review-btn" onClick={() => setShowConfirmation(true)}>
          ❌ Supprimer un avis
        </button>

        {showConfirmation && (
          <div className="delete-confirmation">
            <p>Êtes-vous sûr de vouloir supprimer cet avis ?</p>
            <textarea
              placeholder="Raison de la suppression (facultatif)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="4"
              className="delete-reason-textarea"
            ></textarea>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="confirmation-buttons">
              <button className="confirm-delete-btn" onClick={handleDelete}>
                Confirmer
              </button>
              <button className="cancel-delete-btn" onClick={() => setShowConfirmation(false)}>
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPopup;
