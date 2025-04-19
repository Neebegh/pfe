import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CategoryPage.css';

const WomenCategory = () => {
  const { addToCart } = useCart();

  const womenProducts = [
    { id: 1, name: "Robe Élégante", price: 199, rating: 5, image: "https://www.cdiscount.com/pdt2/3/2/4/1/700x700/mp60452324/rw/robe-robe-de-bureau-elegante-a-manches-longues-pou.jpg" },
    { id: 2, name: "Top Femme", price: 89, rating: 4, image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Jupe Femme", price: 129, rating: 4, image: "https://cyrillus.fr/cdn/shop/files/00600_0863_2026_PO_FA_F1XX.jpg?v=1741187745&width=800" },
    { id: 4, name: "Veste Femme", price: 259, rating: 5, image: "https://static.wixstatic.com/media/2bfc51_e1be2c6c7dd445cd9cf31a787727d240~mv2.jpg/v1/fill/w_625,h_834,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2bfc51_e1be2c6c7dd445cd9cf31a787727d240~mv2.jpg" }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} ajouté au panier !`);
};

  return (
    <div className="women-category-container">
      {/* Bandeau Collection Femmes */}
      <section className="women-hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Collection Femmes</h1>
          <p>Découvrez notre sélection exclusive pour femme</p>
        </div>
      </section>

      {/* Liste des produits */}
      <div className="container">
        <div className="products-grid">
          {womenProducts.map(product => (
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
    </div>
  );
};

export default WomenCategory;