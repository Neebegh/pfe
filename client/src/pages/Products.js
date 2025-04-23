import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './AllProducts.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [sortOption, setSortOption] = useState('default');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
      );
    }
    switch (sortOption) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price);
      case 'price-desc': return result.sort((a, b) => b.price - a.price);
      case 'name-asc': return result.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return result.sort((a, b) => b.name.localeCompare(a.name));
      default: return result;
    }
  }, [products, searchTerm, sortOption]);

  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} ajouté au panier !`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="products-container">
      <header className="header">
        <h1>Nos Produits</h1>
      </header>

      <div className="search-container">
        <FiSearch />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit"
        />
      </div>

      <div className="filter-container">
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="default">Trier par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name-asc">Nom A-Z</option>
          <option value="name-desc">Nom Z-A</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredAndSortedProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image_url || '/placeholder.jpg'} alt={product.name} />
              <button className="btn-hover-cart" onClick={() => handleAddToCart(product)}>
  🛒 Ajouter au panier
</button>

            </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.price} DT</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Products;
