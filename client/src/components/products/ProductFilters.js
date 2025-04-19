import React, { useState } from 'react';

const ProductFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    priceRange: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form className="product-filters" onSubmit={handleSubmit}>
      <select name="size" value={filters.size} onChange={handleChange}>
        <option value="">Toutes les tailles</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>
      
      <select name="priceRange" value={filters.priceRange} onChange={handleChange}>
        <option value="">Tous les prix</option>
        <option value="0-50">0-50 DT</option>
        <option value="50-100">50-100 DT</option>
      </select>
      
      <button type="submit">Filtrer</button>
    </form>
  );
};

export default ProductFilters;