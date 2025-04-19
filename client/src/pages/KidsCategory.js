import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CategoryPage.css';

const KidsCategory = () => {
  const { addToCart } = useCart();

  const kidsProducts = [
    { id: 1, name: "T-Shirt Enfant", price: 39, rating: 4, image: "https://th.bing.com/th/id/R.8c0f68959e7497607cb49a71b9f6f148?rik=kkSIlBbKRkSXmQ&pid=ImgRaw&r=0" },
    { id: 2, name: "Robe Enfant", price: 79, rating: 5, image: "https://www.jacadi.dz/2910679-large_default/robe-enfant-fille-en-popeline.webp" },
    { id: 3, name: "Ensemble Bébé", price: 119, rating: 4, image: "https://www.vertbaudet.com/fstrz/r/s/media.vertbaudet.com/Pictures/vertbaudet/178979/ensemble-combinaison-bandeau-imprimes-bebe-fille.jpg?width=800" },
    { id: 4, name: "Pyjama Enfant", price: 69, rating: 5, image: "https://th.bing.com/th/id/OIP.Y0iCnJYTSIYTYTzLLymzxwHaJ4?rs=1&pid=ImgDetMain" },
    { id: 5, name: "Salopette Garçon", price: 89, rating: 4, image: "https://th.bing.com/th/id/OIP.D4O-2boFz0y35E-h9LmH9wHaLG?rs=1&pid=ImgDetMain" },
    { id: 6, name: "Jupe Fille", price: 59, rating: 4, image: "https://www.ikks.com/dw/image/v2/BFQN_PRD/on/demandware.static/-/Sites-ikks_master_v0/default/dw0be7d3b2/produits/XV27092-02/IKKS-JUPE~SHORT~NOIRE~IMPRIME~GRAPHIQUE~FILLE-XV27092-02_3.jpg?sw=707&sh=910" },
    { id: 7, name: "Manteau Enfant", price: 149, rating: 5, image: "https://www.cdiscount.com/pdt2/6/4/2/1/700x700/mp60458642/rw/manteau-enfant-garcon-de-5-a-10-ans-chaude-a-capuc.jpg" },
    { id: 8, name: "Chaussures Bébé", price: 99, rating: 4, image: "https://th.bing.com/th/id/OIP.3QZQZQZQZQZQZQZQZQZQZQHaHa?rs=1&pid=ImgDetMain" },
    { id: 9, name: "Bonnet Enfant", price: 29, rating: 3, image: "https://img.freepik.com/photos-premium/bonnet-isole-fond-blanc_640852-1776.jpg" },
    { id: 10, name: "Ensemble Sport", price: 109, rating: 5, image: "https://ae01.alicdn.com/kf/S5eb4c22e34b542a89d04e2daf5312efdt/Ensemble-pull-et-pantalon-de-sport-pour-enfants-surv-tement-pour-enfants-v-tements-de-d.jpg" },
    { id: 11, name: "Maillot de Bain", price: 49, rating: 4, image: "https://th.bing.com/th/id/R.5b0ebea079779f13146cd8dde6137f14?rik=y%2bP5lfbPuRPENw&pid=ImgRaw&r=0" },
    { id: 12, name: "Pull Enfant", price: 79, rating: 4, image: "https://images.zen.com.tn/medias/folder_07_09_2023/8_U2_A0550_7ce2e987b0.webp" }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ajouté au panier !`);
};

  return (
    <div className="kids-category-container">
      {/* Bandeau Collection Enfants */}
      <section className="kids-hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Collection Enfants</h1>
          <p>Des vêtements adorables pour les petits</p>
        </div>
      </section>

      {/* Liste des produits */}
      <div className="container">
        <div className="products-grid">
          {kidsProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart /> Ajouter
                </button>
                <span className="product-badge">{product.rating === 5 ? "Top Vente" : ""}</span>
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
    </div>
  );
};

export default KidsCategory;