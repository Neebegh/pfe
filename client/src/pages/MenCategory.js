// src/pages/MenCategory.js
import React from 'react';
// Supprimer cette ligne : import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CategoryPage.css';

// ... (le reste du code reste inchangé)

const MenCategory = () => {
  const { addToCart } = useCart();

  const menProducts = [
    { id: 1, name: "T-Shirt Homme", price: 59, rating: 4, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Jean Homme", price: 129, rating: 5, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Veste Homme", price: 299, rating: 4, image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Costume Homme", price: 399, rating: 5, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ajouté au panier !`);
};

  return (
    <div className="category-container">
      <h1 className="category-title">Collection Hommes</h1>
      <div className="products-grid">
        {menProducts.map(product => (
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
    </div>
  );
};

export default MenCategory;