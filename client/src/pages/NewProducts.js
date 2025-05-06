import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css'; // Utilise le même style que les autres catégories

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products/new');
        if (!res.ok) throw new Error('Erreur chargement nouveautés');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="category-modern-container">
      <h1 className="page-title">🆕 Nos Nouveautés</h1>
      <div className="product-modern-grid">
        {products.map(product => (
          <div className="product-modern-card" key={product.id}>
            <div className="image-wrapper">
              <img
                src={
                  product.image_url.startsWith('http')
                    ? product.image_url
                    : `http://localhost:5000${product.image_url}`
                }
                alt={product.name}
              />
              <span className="badge-new">Nouveau</span>
              <button
                className="btn-hover-cart"
                onClick={() =>
                  navigate('/fitting-room', {
                    state: { product }
                  })
                }
              >
                🎯 Essayage
              </button>
            </div>

            <div className="info-zone">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price} DT</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
