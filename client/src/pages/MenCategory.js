import React, { useEffect, useState, useMemo } from 'react';
import './CategoryPage.css';

const MenCategory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  const womenProducts = useMemo(() => {
    return products
      .filter(p => p.category === 'hommes')
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]);

  const handleAddToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    const updatedCart = exists
      ? cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} ajouté au panier !`);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    const updated = exists
      ? wishlist.filter(item => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const isInWishlist = (id) => wishlist.some(p => p.id === id);

  return (
    <div className="category-modern-container">
      <h1>Produits pour Hommes</h1>

      <div className="search-modern">
        <input
          type="text"
          placeholder="Rechercher un produit"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenCategory;
