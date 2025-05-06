import React, { useEffect, useState } from 'react';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/reviews/all');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des avis :", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>📝 Tous les avis clients</h2>
      {reviews.length === 0 ? (
        <p>Aucun avis disponible.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>ID</th>
              <th>Nom du produit</th>
              <th>Nom utilisateur</th>
              <th>Email</th>
              <th>Commentaire</th>
              <th>Note</th>
              <th>Image</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{r.id}</td>
                <td>{r.product_name}</td>
                <td>{r.user_name}</td>
                <td>{r.user_email}</td>
                <td>{r.comment}</td>
                <td>{r.rating ?? '—'}</td>
                <td>
                  <img src={r.product_image} alt="img" width="60" height="60"
                       onError={(e) => (e.target.style.display = 'none')}
                  />
                </td>
                <td>{new Date(r.created_at).toLocaleString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReviewList;
