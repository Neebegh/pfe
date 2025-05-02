import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CategoryPage.css';
import { useAuth } from '../context/AuthContext';
import ReportPopup from '../components/ui/ReportPopup';

const WomenCategory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [comments, setComments] = useState({});
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [productReviews, setProductReviews] = useState({});
  const [popupProductId, setPopupProductId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        data.products.forEach(p => {
          if (p.category === 'femmes') loadReviews(p.id);
        });
      });

    const fittingSuccess = sessionStorage.getItem('fittingSuccess');
    if (fittingSuccess) {
      setSuccessMessage('✅ Essayage terminé ! Vous pouvez ajouter au panier.');
      sessionStorage.removeItem('fittingSuccess');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  }, []);

  const womenProducts = useMemo(() => {
    return products
      .filter(p => p.category === 'femmes')
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]);

  const handleAddToCart = (product) => {
    const fitting = JSON.parse(localStorage.getItem('fittingDone')) || {};

    if (!fitting[product.id]) {
      alert('⚠️ Faites un essayage avant d\'ajouter au panier.');
      return;
    }

    const exists = cart.find(item => item.id === product.id);
    const updatedCart = exists
      ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} ajouté au panier !`);
  };

  const toggleWishlist = (product) => {
    const updated = wishlist.some(item => item.id === product.id)
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const isInWishlist = (id) => wishlist.some(p => p.id === id);

  const handleCommentChange = (id, value) => {
    setComments(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitReview = async (productId) => {
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return alert("Produit introuvable.");

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
          comment: comments[productId],
          productImage: product.image_url,
          productName: product.name
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSubmittedReviews(prev => ({ ...prev, [productId]: true }));
        loadReviews(productId);
        setTimeout(() => {
          setSubmittedReviews(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
          });
        }, 2000);
      } else {
        alert(data.message || 'Erreur lors de l’envoi de l’avis.');
      }
    } catch (error) {
      alert('Erreur de connexion au serveur.');
      console.error(error);
    }
  };

  const loadReviews = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${productId}`);
      const data = await res.json();
      setProductReviews(prev => ({ ...prev, [productId]: data.reviews }));
    } catch (err) {
      console.error('Erreur lors du chargement des avis', err);
    }
  };

  const handleDeleteReview = async (reviewId, productId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, { method: 'DELETE' });

      if (res.ok) {
        setProductReviews(prev => ({
          ...prev,
          [productId]: prev[productId].filter(r => r.id !== reviewId),
        }));
        alert('Avis supprimé avec succès.');
      } else {
        const data = await res.json();
        alert(data.message || 'Erreur lors de la suppression.');
      }
    } catch (error) {
      alert('Erreur serveur.');
      console.error(error);
    }
  };

  const handleViewReviews = (productId) => {
    navigate(`/product-reviews/${productId}`);
  };

  return (
    <div className="category-modern-container">
      <h1 className="page-title">Notre sélection pour Femmes</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="search-modern">
        <input
          type="text"
          placeholder="🔍 Rechercher un produit"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-modern-grid">
        {womenProducts.map(product => (
          <div className="product-modern-card" key={product.id}>
            <div className="image-wrapper">
              <img src={product.image_url} alt={product.name} />
              {product.isNew && <span className="badge-new">Nouveauté</span>}
              <button
                className={`heart-wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>
              <button className="btn-hover-cart" onClick={() => handleAddToCart(product)}>
                Ajouter au panier
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
                🎯 Faire un Essayage
              </button>

              <button onClick={() => setPopupProductId(product.id)} className="report-btn">
                🚩 Signaler un problème
              </button>

              <button onClick={() => handleViewReviews(product.id)} className="view-reviews-btn">
                Voir les avis
              </button>
            </div>

            {user ? (
              <div className="product-review-section">
                <label htmlFor={`review-${product.id}`} className="review-label">
                  Laisser un avis client :
                </label>
                <textarea
                  id={`review-${product.id}`}
                  className="review-textarea"
                  placeholder="Partagez votre expérience avec ce produit..."
                  value={comments[product.id] || ''}
                  onChange={(e) => handleCommentChange(product.id, e.target.value)}
                />
                <button
                  className="review-submit-btn"
                  onClick={() => handleSubmitReview(product.id)}
                  disabled={!comments[product.id] || comments[product.id].trim() === ''}
                >
                  Envoyer l’avis
                </button>
                {submittedReviews[product.id] && <span>✅ Merci pour votre avis !</span>}
              </div>
            ) : (
              <p className="review-login-message">
                <Link to="/login">Connectez-vous</Link> pour laisser un avis.
              </p>
            )}
          </div>
        ))}
      </div>

      {popupProductId && (
        <ReportPopup isOpen={true} onClose={() => setPopupProductId(null)} productId={popupProductId} />
      )}
    </div>
  );
};

export default WomenCategory;
