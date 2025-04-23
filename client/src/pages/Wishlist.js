// ✅ Wishlist.js - Affiche tous les articles aimés ❤️
import React, { useEffect, useState } from 'react';
import './CategoryPage.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    setWishlist(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  
    // 🔁 Met à jour le compteur dans la navbar
    window.dispatchEvent(new Event('storage'));
  };
  

  const handleAddToCart = (product) => {
    alert(`${product.name} ajouté au panier`);
  };

  return (
    <div className="category-modern-container">
      <h1>Ma liste d'envies</h1>

      {wishlist.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucun article dans votre liste d’envies.</p>
      ) : (
        <div className="product-modern-grid">
          {wishlist.map(product => (
            <div className="product-modern-card" key={product.id}>
              <div className="image-wrapper">
                <img src={product.image_url} alt={product.name} />
                <button
                  className="heart-wishlist active"
                  title="Retirer de la liste"
                  onClick={() => removeFromWishlist(product.id)}
                ><span role="img" aria-label="Supprimer">🗑️</span></button>
              </div>
              <div className="info-zone">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price} DT</p>
                <button className="modern-btn" onClick={() => handleAddToCart(product)}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
