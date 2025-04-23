import React from 'react';
import './Retours.css';

const Retours = () => {
  return (
    <div className="retours-container">
      <h2 className="retours-title">Politique de Retours</h2>

      <p>
        Chez <strong>FashionFit</strong>, votre satisfaction est notre priorité. Si un article ne vous convient pas ou ne correspond pas à vos attentes, vous pouvez le retourner sous certaines conditions :
      </p>

      <ul className="retours-list">
        <li><span role="img" aria-label="sablier">⏳</span> Vous avez <strong>14 jours</strong> après la réception pour effectuer un retour.</li>
        <li><span role="img" aria-label="colis">📦</span> Les articles doivent être <strong>non portés, non lavés</strong>, avec étiquettes et emballage d’origine.</li>
        <li><span role="img" aria-label="localisation">📍</span> Les frais de retour sont à la charge du client, sauf en cas d’erreur de notre part.</li>
      </ul>

      <h3>Comment effectuer un retour ?</h3>
      <ol className="retours-steps">
        <li><span role="img" aria-label="étape 1">1️⃣</span> Connectez-vous à votre compte.</li>
        <li><span role="img" aria-label="étape 2">2️⃣</span> Allez dans la section <strong>"Mes commandes"</strong> et sélectionnez l’article à retourner.</li>
        <li><span role="img" aria-label="étape 3">3️⃣</span> Cliquez sur <strong>"Demander un retour"</strong> et suivez les instructions.</li>
        <li><span role="img" aria-label="étape 4">4️⃣</span> Emballez l’article et expédiez-le à l’adresse indiquée.</li>
      </ol>

      <p className="retours-contact">
        <span role="img" aria-label="question">❓</span> Pour toute question, contactez-nous à : <strong>contact@smartfashion.tn</strong> ou par téléphone au <strong>+216 99 123 456</strong>.
      </p>
    </div>
  );
};

export default Retours;
