import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products || []));
  }, []);

  return (
    <div>
      <h1>🛠️ Tableau de bord Admin</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - {p.price} DT</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
