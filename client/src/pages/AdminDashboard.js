import React from 'react';
import '../styles/AdminDashboard.css';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ReviewList from './ReviewList';
import ReportList from './ReportList';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">👤</div>
          <h2>Admin</h2>
          <p>admin@smartfashion.com</p>
        </div>
        <ul className="nav-links">
          <li><a href="#add-product">➕ Ajout Produit</a></li>
          <li><a href="#product-list">📦 Liste Produits</a></li>
          <li><a href="#reviews">📝 Avis Clients</a></li>
          <li><a href="#reports">🚩 Signalements</a></li>
        </ul>
      </aside>

      <main className="dashboard-content">
        <section id="add-product">
          <h2>➕ Ajouter un produit</h2>
          <ProductForm />
        </section>

        <section id="product-list">
          <h2>📦 Produits</h2>
          <ProductList />
        </section>

        <section id="reviews">
          <h2>📝 Avis Clients</h2>
          <ReviewList />
        </section>

        <section id="reports">
          <h2>🚩 Signalements</h2>
          <ReportList />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
