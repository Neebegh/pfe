import React, { useEffect, useState } from 'react';
import './ProductList.css'; // ce fichier aura le style Zara

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(err => console.error('❌ Erreur lors du chargement des produits :', err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.message || 'Erreur suppression');
      }
    } catch (err) {
      alert('Erreur serveur');
    }
  };

  return (
    <div className="zara-container">
      {products.map(product => (
        <div key={product.id} className="zara-card">
          <img
            src={
              product.image_url.startsWith('http')
                ? product.image_url
                : `http://localhost:5000${product.image_url}`
            }
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>{product.price} DT</p>
          <div className="zara-btns">
            <button className="zara-btn delete" onClick={() => handleDelete(product.id)}>Supprimer</button>
            <button className="zara-btn edit">Modifier</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
