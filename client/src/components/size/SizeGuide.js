import React, { useState } from 'react';

const SizeGuide = ({ user, setUser }) => {
  const [measurements, setMeasurements] = useState({
    height: user?.measurements?.height || '',
    chest: user?.measurements?.chest || '',
    waist: user?.measurements?.waist || '',
    hips: user?.measurements?.hips || '',
    inseam: user?.measurements?.inseam || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, measurements });
  };

  return (
    <div className="size-guide">
      <h2>Guide des Tailles</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(measurements).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>
              {key === 'height' && 'Taille (cm)'}
              {key === 'chest' && 'Tour de poitrine (cm)'}
              {key === 'waist' && 'Tour de taille (cm)'}
              {key === 'hips' && 'Tour de hanches (cm)'}
              {key === 'inseam' && 'Longueur entrejambe (cm)'}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setMeasurements({
                ...measurements,
                [key]: e.target.value
              })}
              required
              min="0"
            />
          </div>
        ))}
        <button type="submit">Enregistrer Mesures</button>
      </form>
    </div>
  );
};

export default SizeGuide;