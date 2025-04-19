// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import './AllProducts.css';

const CartPage = ({ updateCartCount }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    if (updateCartCount) updateCartCount(cart.length);
  }, [cart, updateCartCount]);

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
  };

  const updateQuantity = (id, amount) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updated);
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <div className="all-products-container">
      <h2 className="page-title">🛒 Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="products-grid">
          {cart.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="product-image-container">
                <img src={item.image} alt={item.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">{item.price} DT</p>
                <div style={{ margin: '0.5rem 0' }}>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span style={{ margin: '0 1rem' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button className="add-to-cart-btn" onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'right', fontWeight: 'bold' }}>
          Total : {getTotal()} DT
        </div>
      )}
    </div>
  );
};

export default CartPage;
