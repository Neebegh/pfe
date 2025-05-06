import React, { useState } from 'react';
import './productForm.css';
const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: null,
    isNew: false  // ✅ ajoute cette ligne !
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : (type === 'checkbox' ? checked : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("❌ Veuillez sélectionner une image.");
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('isNew', formData.isNew);
    data.append('image', formData.image);

    try {
      const res = await fetch('http://localhost:5000/api/products/upload', {
        method: 'POST',
        body: data
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Produit ajouté avec succès !');
        setFormData({ name: '', price: '', category: '', image: null, isNew: false });
      } else {
        alert(result.message || '❌ Erreur serveur lors de l’ajout du produit.');
      }
    } catch (err) {
      console.error('❌ Erreur réseau :', err);
      alert('❌ Erreur de connexion au serveur.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nom du produit" required />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Prix" required />
      
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">-- Choisir une catégorie --</option>
        <option value="hommes">Hommes</option>
        <option value="femmes">Femmes</option>
        <option value="Enfants">Enfants</option>
      </select>

      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      
      <label>
        <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
        Nouveau ?
      </label>
      
      <button type="submit">Ajouter le produit</button>
    </form>
  );
};

export default ProductForm;
