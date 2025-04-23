import React from 'react';
import './ContactForm.css'; // tu peux créer ce fichier pour les styles

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Informations de contact */}
        <div className="contact-info">
          <h2>Contactez-nous</h2>
          <p>Nous sommes ravis de vous aider !</p>
          <div className="info-block">
            <strong>Adresse :</strong>
            <p>123 Avenue de la Mode, Tunis, Tunisie</p>
          </div>
          <div className="info-block">
            <strong>Téléphone :</strong>
            <p>+216 55 123 456</p>
          </div>
          <div className="info-block">
            <strong>Email :</strong>
            <p>contact@smartfashion.tn</p>
          </div>
        </div>

        {/* Formulaire de contact */}
        <form className="contact-form">
          <h3>Envoyez-nous un message</h3>
          <input type="text" placeholder="Nom complet" required />
          <input type="email" placeholder="Adresse e-mail" required />
          <textarea rows="5" placeholder="Votre message..." required></textarea>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
