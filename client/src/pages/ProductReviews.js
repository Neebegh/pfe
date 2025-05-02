import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductReviews.css';
import { useAuth } from '../context/AuthContext';

const ProductReviews = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const { user } = useAuth();

  // Charger les infos du produit
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        console.log("🧾 Produit :", data); // 👈 NE PAS SUPPRIMER, on vérifie ici
        setProduct(data);
      })
      .catch(err => console.error("Erreur produit :", err));
  }, [productId]);
  
  // Charger les avis
  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews/${productId}`)
      .then(res => res.json())
      .then(data => setReviews(data.reviews || []))
      .catch(err => console.error("Erreur avis :", err));
  }, [productId]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Supprimer cet avis ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const handleEdit = (reviewId, comment) => {
    setEditMode(reviewId);
    setEditedComment(comment);
  };

  const handleUpdate = async (reviewId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/update/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: editedComment }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId ? { ...r, comment: editedComment } : r
          )
        );
        setEditMode(null);
      }
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  return (
    <div className="review-page-container">
      {product && (
        <div className="product-header">
 <img
  className="product-image"
  src={`http://localhost:5000/images/${product.image_url}`}
  alt={product.name}
  onError={(e) => e.target.src = "/images/j.png"} // affiche une image par défaut si cassée
/>


          <h2 className="product-title">{product.name}</h2>
        </div>
      )}

      <h3 className="section-title">Avis des utilisateurs</h3>

      {reviews.length === 0 ? (
        <p className="no-reviews">Aucun avis pour ce produit pour le moment.</p>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <div className="avatar">{review.user_name?.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="username">{review.user_name}</div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < (review.rating || 0) ? "star filled" : "star"}>★</span>
                    ))}
                  </div>
                </div>
              </div>

              {editMode === review.id ? (
                <>
                  <textarea
                    className="edit-textarea"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <button className="btn-save" onClick={() => handleUpdate(review.id)}>💾 Enregistrer</button>
                  <button className="btn-cancel" onClick={() => setEditMode(null)}>✖️ Annuler</button>
                </>
              ) : (
                <>
                  <p className="review-comment">"{review.comment}"</p>
                  <div className="review-date">
                    {new Date(review.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </>
              )}

              {user?.name === review.user_name && (
                <div className="review-actions">
                  <button className="btn-edit" onClick={() => handleEdit(review.id, review.comment)}>✏️ Modifier</button>
                  <button className="btn-delete" onClick={() => handleDelete(review.id)}>🗑️ Supprimer</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
