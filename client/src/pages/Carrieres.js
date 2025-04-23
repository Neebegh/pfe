import React from 'react';
import './Carrieres.css';

const Carrieres = () => {
  return (
    <div className="carrieres-container">
      <h2 className="carrieres-title">Rejoignez-nous chez SmartFashion</h2>

      <p>
        Chez <strong>SmartFashion</strong>, nous croyons en l'innovation, la créativité et la diversité. Si vous souhaitez rejoindre une équipe dynamique et passionnée, explorez nos offres de carrière ci-dessous !
      </p>

      <h3>Nos Offres Actuelles</h3>
      <ul className="carrieres-list">
        <li>
          <span role="img" aria-label="bureau">🏢</span> Développeur Full-Stack
        </li>
        <li>
          <span role="img" aria-label="designer">🎨</span> Designer UI/UX
        </li>
        <li>
          <span role="img" aria-label="gestionnaire">🧑‍💼</span> Responsable Marketing Digital
        </li>
        <li>
          <span role="img" aria-label="service client">💬</span> Chargé de Service Client
        </li>
        <li>
          <span role="img" aria-label="ventes">💼</span> Responsable des Ventes
        </li>
        <li>
          <span role="img" aria-label="stockage">📦</span> Gestionnaire de Stock
        </li>
      </ul>

      <h3>Pourquoi rejoindre SmartFashion ?</h3>
      <ul className="carrieres-benefits">
        <li>
          <span role="img" aria-label="équipe">👥</span> Travail en équipe avec des experts du secteur.
        </li>
        <li>
          <span role="img" aria-label="formation">📚</span> Opportunités de formation et de développement professionnel.
        </li>
        <li>
          <span role="img" aria-label="croissance">📈</span> Ambiance de travail stimulante et en pleine croissance.
        </li>
        <li>
          <span role="img" aria-label="avantages">💼</span> Avantages sociaux et programmes de bien-être.
        </li>
        <li>
          <span role="img" aria-label="carrière">🚀</span> Opportunités d'évolution de carrière.
        </li>
      </ul>

      <h3>Comment Postuler ?</h3>
      <ol className="carrieres-steps">
        <li><span role="img" aria-label="étape 1">1️⃣</span> Consultez nos offres sur cette page.</li>
        <li><span role="img" aria-label="étape 2">2️⃣</span> Envoyez votre CV et lettre de motivation à <strong>recrutement@smartfashion.tn</strong>.</li>
        <li><span role="img" aria-label="étape 3">3️⃣</span> Notre équipe des ressources humaines vous contactera pour un entretien.</li>
      </ol>

      <h3>Nous Recherchons</h3>
      <p>
        Des personnes motivées, passionnées par la mode et la technologie, et prêtes à contribuer à la révolution du commerce en ligne.
      </p>

      <p>Pour plus d'informations, contactez-nous à <strong>recrutement@smartfashion.tn</strong>.</p>
    </div>
  );
};

export default Carrieres;
