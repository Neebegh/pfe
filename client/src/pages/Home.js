// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();

  const categories = [
    { id: 1, name: "Hommes", link: "/hommes", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Femmes", link: "/femmes", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Enfants", link: "/enfants", image: "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
  ];

  const recommendedProducts = [
    { id: 1, name: "T-Shirt Slim", price: 59, rating: 4, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Jean Slim Fit", price: 129, rating: 5, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Veste en Cuir", price: 299, rating: 4, image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Bienvenue chez SmartFashion</h1>
          <p>Découvrez des vêtements qui vous correspondent vraiment</p>
<Link to="/products" className="cta-btn">Explorer la collection</Link>        </div>
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

      {/* Produits Recommandés */}
      <section className="recommended-section container">
        <h2 className="section-title">Nos Produits Phares</h2>
        <div className="products-grid">
          {recommendedProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart /> Ajouter
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < product.rating ? "star-filled" : "star-empty"} />
                  ))}
                  <span className="rating-count">({product.rating})</span>
                </div>
                <p className="product-price">{product.price.toFixed(2)} DT</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
