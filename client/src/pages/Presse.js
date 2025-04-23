import React from 'react';
import './Presse.css';

const Presse = () => {
  return (
    <div className="presse-container">
      <h2 className="presse-title">Espace Presse <span role="img" aria-label="journal">📰</span></h2>

      <p className="presse-intro">
        Bienvenue dans l’espace presse de <strong>SmartFashion</strong>. Retrouvez ici nos communiqués,
        les articles de presse qui parlent de nous, ainsi que nos contacts presse.
      </p>

      <h3>Ils parlent de nous</h3>
      <ul className="presse-mentions">
        <li><span role="img" aria-label="journal">🗞</span> <em>La Presse de Tunisie</em> - "SmartFashion révolutionne l'achat de vêtements en ligne"</li>
        <li><span role="img" aria-label="télévision">📺</span> <em>El Hiwar Ettounsi</em> - Interview exclusive de notre fondatrice</li>
        <li><span role="img" aria-label="journal">📰</span> <em>Tunisie Numérique</em> - "Une startup qui mise sur l’intelligence des tailles personnalisées"</li>
      </ul>

      <h3>Derniers communiqués</h3>
      <ul className="presse-communiques">
        <li><span role="img" aria-label="calendrier">📅</span> Mars 2025 : Lancement de notre nouvelle collection printemps</li>
        <li><span role="img" aria-label="calendrier">📅</span> Janvier 2025 : Partenariat avec des créateurs tunisiens</li>
        <li><span role="img" aria-label="calendrier">📅</span> Décembre 2024 : Ouverture de notre premier pop-up store à Tunis</li>
      </ul>

      <h3>Contact Presse</h3>
      <p className="presse-contact">
        <span role="img" aria-label="question">❓</span> Pour toute question, contactez-nous à : <strong>press@smartfashion.tn</strong><br />
        📞 <strong>+216 98 456 123</strong><br />
        Responsable presse : <strong>Sana Ben Ahmed</strong>
      </p>
    </div>
  );
};

export default Presse;
