import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: "Comment puis-je choisir la bonne taille ?",
    answer:
      "Vous pouvez entrer vos mensurations dans votre profil, et nous vous recommanderons la taille idéale selon chaque produit.",
  },
  {
    question: "Que faire si l'article ne correspond pas à la description ?",
    answer:
      "Vous pouvez signaler le produit via le bouton 'Signaler', ou contacter notre service client pour un retour ou remboursement.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "La livraison prend généralement entre 2 et 5 jours ouvrables, selon votre région.",
  },
  {
    question: "Puis-je suivre ma commande ?",
    answer:
      "Oui ! Dès que votre commande est expédiée, vous recevez un lien de suivi par email.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <h2 className="faq-title">Foire Aux Questions (FAQ)</h2>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
            onClick={() => toggleIndex(index)}
          >
            <div className="faq-question">{item.question}</div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
