import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReportPopup from '../components/ui/ReportPopup';
import './CategoryPage.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [popupProductId, setPopupProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(err => console.error("Erreur de chargement :", err));
  }, []);

  const allFiltered = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const addToCart = (product) => {
    const fitting = JSON.parse(localStorage.getItem('fittingDone')) || {};
    if (!fitting[product.id]) {
      alert('⚠️ Faites un essayage avant d\'ajouter ce produit au panier.');
      return;
    }

    const exists = cart.find(item => item.id === product.id);
    const updated = exists
      ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];

    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    alert('✅ Produit ajouté au panier');
  };

  const toggleWishlist = (product) => {
    const updated = wishlist.some(p => p.id === product.id)
      ? wishlist.filter(p => p.id !== product.id)
      : [...wishlist, product];

    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const isInWishlist = (id) => wishlist.some(p => p.id === id);

  return (
    <div className="category-modern-container">
      <h1 className="page-title">Tous nos produits</h1>

      <div className="search-modern">
        <input
          type="text"
          placeholder="🔍 Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showLoginMessage && (
        <div className="login-toast">
          🚫 Veuillez vous <Link to="/login" className="login-link">vous connecter</Link> pour signaler un problème.
        </div>
      )}

      <div className="product-modern-grid">
        {allFiltered.map(product => (
          <div className="product-modern-card" key={product.id}>
            <div className="image-wrapper">
              <img
                src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:5000${product.image_url}`}
                alt={product.name}
              />
              <button
                className={`heart-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>
              <button className="btn-hover-cart" onClick={() => addToCart(product)}>
                🛒 Ajouter au panier
              </button>
            </div>

            <div className="info-zone">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price} DT</p>

              <button
                className="btn-fitting-room"
                onClick={() =>
                  navigate('/fitting-room', {
                    state: { productId: product.id, productImage: product.image_url, productName: product.name }
                  })
                }
              >
                🎯 Essayage
              </button>

              <button className="view-reviews-btn" onClick={() => navigate(`/product-reviews/${product.id}`)}>
                Voir les avis
              </button>

              <button
                onClick={() => {
                  if (!user) {
                    setShowLoginMessage(true);
                    setTimeout(() => setShowLoginMessage(false), 3000);
                  } else {
                    setPopupProductId(product.id);
                  }
                }}
                className="report-btn"
              >
                🚩 Signaler un problème
              </button>
            </div>

            {user ? (
              <p className="review-login-message">
                <Link to={`/product-reviews/${product.id}`}>Laisser un avis</Link>
              </p>
            ) : (
              <p className="review-login-message">
                <Link to="/login">Connectez-vous</Link> pour laisser un avis.
              </p>
            )}
          </div>
        ))}
      </div>

      {popupProductId && (() => {
        const product = products.find(p => p.id === popupProductId);
        if (!product || !user) {
          console.warn("⛔ Problème : produit ou utilisateur manquant");
          return null;
        }
        return (
          <ReportPopup
            isOpen={true}
            onClose={() => setPopupProductId(null)}
            product={product}
            user={user}
          />
        );
      })()}
    </div>
  );
};

export default Products;
