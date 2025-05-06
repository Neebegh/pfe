// AvatarForm.jsx
import React, { useState } from 'react';

const AvatarForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: '', weight: '', chest: '', waist: '', hips: '', gender: 'female'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>👕 Créez votre avatar virtuel</h2>
      {['height', 'weight', 'chest', 'waist', 'hips'].map(field => (
        <>
          <label>{field[0].toUpperCase() + field.slice(1)} (cm):</label>
          <input type="number" name={field} value={formData[field]} onChange={handleChange} required />
        </>
      ))}
      <label>Genre :</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="female">Femme</option>
        <option value="male">Homme</option>
      </select>
      <button type="submit">➡️ Créer avatar</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '400px',
    margin: 'auto', fontFamily: 'sans-serif', background: '#f4f4f4', padding: '2rem',
    borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  }
};

export default AvatarForm;
