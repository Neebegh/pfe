import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MenCategory from './pages/MenCategory';
import WomenCategory from './pages/WomenCategory';
import KidsCategory from './pages/KidsCategory';
import NewProducts from './pages/NewProducts';

import CartPage from './pages/CartPage';
import NotreHistoire from './pages/NotreHistoire';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Retours from './pages/Retours';
import Carrieres from './pages/Carrieres';
import Presse from './pages/Presse';
import Wishlist from './pages/Wishlist';
import FittingRoom from './pages/FittingRoom';
import SnapFittingRoom from './pages/SnapFittingRoom';
import ProductReviews from './pages/ProductReviews';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './routes/AdminRoute'; // 🔐 protection admin
import AvatarTryOnPage from './pages/AvatarTryOnPage';
import ClothTryOn from './pages/ClothTryOn';


const App = () => {
  const { cart } = useCart();

  return (
    <>
      <Navbar cartCount={cart.length} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Catégories */}
          <Route path="/hommes" element={<MenCategory />} />
          <Route path="/femmes" element={<WomenCategory />} />
          <Route path="/enfants" element={<KidsCategory />} />
          <Route path="/nouveautés" element={<NewProducts />} />

          <Route path="/admin" element={ <AdminRoute> <AdminDashboard /> </AdminRoute>} />

          {/* Autres pages */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/retours" element={<Retours />} />
          <Route path="/carrieres" element={<Carrieres />} />
          <Route path="/presse" element={<Presse />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          {/* Pages spécifiques aux produits */}
          <Route path="/fitting-room" element={<FittingRoom />} />
          <Route path="/snap-fitting-room" element={<SnapFittingRoom />} />
          <Route path="/product-reviews/:productId" element={<ProductReviews />} /> 
          <Route path="/create-avatar" element={<AvatarTryOnPage />} />
        

<Route path="/cloth-try-on" element={<ClothTryOn />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
