// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import './AllProducts.css'; 
// import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/ui/LoadingSpinner'; // ✅ SEULEMENT cette ligne
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur chargement produits :', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (!existing) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filteredProducts = filter
    ? products.filter((p) => p.category === filter)
    : products;

  return (
    <div className="all-products-container">
      <h2 className="page-title">Nos Produits</h2>
      <p>Tous les produits disponibles pour hommes, femmes et enfants.</p>

      <div className="filters">
        <button onClick={() => setFilter('')}>Tous</button>
        <button onClick={() => setFilter('homme')}>Homme</button>
        <button onClick={() => setFilter('femme')}>Femme</button>
        <button onClick={() => setFilter('enfant')}>Enfant</button>
        <button onClick={() => navigate('/cart')} style={{ float: 'right' }}>
          Voir le panier 🛒 ({cart.length})
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-category">{product.category}</div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  + Ajouter
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price} DT</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
