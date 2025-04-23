// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { id: 1, name: "Hommes", link: "/hommes", image: "https://th.bing.com/th/id/OIP.u-VIZxDISMApNR3D13FpqAHaE7?rs=1&pid=ImgDetMain" },
    { id: 2, name: "Femmes", link: "/femmes", image: "https://th.bing.com/th/id/OIP.z7qlaQOaOCjUGiXgs_7eswAAAA?rs=1&pid=ImgDetMain" },
    { id: 3, name: "Enfants", link: "/enfants", image: "https://www.joliefamily.fr/wp-content/uploads/Quels-vetements-adaptes-a-chaque-saison-pour-les-enfants-1.jpeg.webp" }
  ];

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Bienvenue chez SmartFashion</h1>
          <p>Découvrez des vêtements qui vous correspondent vraiment</p>
          <Link to="/products" className="cta-btn">Explorer la collection</Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="categories-section container">
        <h2 className="section-title">Nos Catégories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={category.link} key={category.id} className="category-card">
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-overlay"></div>
              <h3 className="category-title">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;