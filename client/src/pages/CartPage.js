import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // Met à jour le localStorage lorsque le panier change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SMART10') {
      setDiscount(10);
      alert('Coupon appliqué : 10% de réduction');
    } else {
      setDiscount(0);
      alert('Code promo invalide');
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0);
    const discountedAmount = subtotal * (discount / 100);
    return (subtotal - discountedAmount).toFixed(2);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      localStorage.removeItem('cart');
      navigate('/checkout/success');
    }, 1500);
  };

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Continuer mes achats
        </button>
        <h1 className="cart-title">
          <FiShoppingBag className="cart-icon" /> Mon Panier
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-illustration"></div>
          <h2>Votre panier est vide</h2>
          <p>Commencez à shopper pour découvrir nos produits exceptionnels</p>
          <button className="browse-button" onClick={() => navigate('/products')}>
            Parcourir la boutique
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <div className="item-price">{item.price} DT</div>

                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Récapitulatif de commande</h3>

            <div className="summary-row">
              <span>Sous-total ({cart.length} articles)</span>
              <span>{cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0).toFixed(2)} DT</span>
            </div>

            <div className="coupon-section">
              <input
                type="text"
                placeholder="Code promo"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Appliquer</button>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span>Réduction ({discount}%)</span>
                <span>
                  -{(cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0) * discount / 100).toFixed(2)} DT
                </span>
              </div>
            )}

            <div className="summary-row delivery">
              <span>Livraison</span>
              <span>Gratuite</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>{calculateTotal()} DT</span>
            </div>

            <button
              className={`checkout-button ${isProcessing ? 'processing' : ''}`}
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? <div className="spinner"></div> : 'Passer la commande'}
            </button>

            <div className="payment-methods">
              <img src="/images/visa.png" alt="Visa" />
              <img src="/images/mastercard.png" alt="Mastercard" />
              <img src="/images/paypal.png" alt="PayPal" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
