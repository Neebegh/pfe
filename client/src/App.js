// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from './context/CartContext'; // ✅ Import ici
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MenCategory from './pages/MenCategory';
import WomenCategory from './pages/WomenCategory';
import KidsCategory from './pages/KidsCategory';
import CartPage from './pages/CartPage';

const App = () => {
  const { cart } = useCart(); // ✅ Accès au panier

  return (
    <>
      <Navbar cartCount={cart.length} /> {/* ✅ On passe cartCount ici */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hommes" element={<MenCategory />} />
          <Route path="/femmes" element={<WomenCategory />} />
          <Route path="/enfants" element={<KidsCategory />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
