import React from 'react';

const NotreHistoire = () => {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Notre Histoire</h1>
      <p className="mb-4">
        Chez <strong>SmartFashion</strong>, notre aventure a commencé avec une vision claire : rendre la mode accessible à tous, sans compromettre la qualité ni le style. Depuis notre création en 2025, nous nous engageons à proposer des vêtements qui inspirent confiance et élégance à chaque client.
      </p>
      <p className="mb-4">
        Notre équipe passionnée travaille chaque jour pour sélectionner les meilleures pièces, suivre les tendances et offrir une expérience d’achat en ligne simple, rapide et agréable.
      </p>
      <p className="mb-4">
        Merci de faire partie de notre histoire{' '}
        <span role="img" aria-label="étoile scintillante">✨</span>.
      </p>
    </div>
  );
};

export default NotreHistoire;
