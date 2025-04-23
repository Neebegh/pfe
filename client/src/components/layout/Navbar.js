import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaHeadset } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const categories = [
    { name: "Femmes", path: "/femmes", subcategories: ["Robes", "Tops", "Pantalons"] },
    { name: "Hommes", path: "/hommes", subcategories: ["Chemises", "Jeans", "Vestes"] },
    { name: "Enfants", path: "/enfants", subcategories: ["Filles", "Garçons", "Bébés"] },
    { name: "Nouveautés", path: "/nouveautes" }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };
    handleWishlist();
    window.addEventListener('storage', handleWishlist);
    return () => window.removeEventListener('storage', handleWishlist);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} aria-label="Navigation principale">
        <div className="navbar-container">
          <div className="navbar-brand">
            <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu mobile">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link to="/" className="logo-link">
              <h1 className="logo-text">SmartFashion</h1>
            </Link>
          </div>

          <div className="main-navigation">
            <ul className="nav-menu">
              {categories.map((category) => (
                <li key={category.path} className="nav-item">
                  <div className="category-link">
                    <Link to={category.path}>{category.name}</Link>
                    {category.subcategories && (
                      <>
                        <FaChevronDown className="dropdown-icon" />
                        <div className="dropdown-menu">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              to={`${category.path}/${sub.toLowerCase()}`}
                              className="dropdown-item"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-actions">
            <div className="action-icons">
              <Link to="/wishlist" className="action-icon" aria-label="Liste de souhaits">
                <FaHeart />
                {wishlistCount > 0 && (
                  <span className="cart-badge">{wishlistCount}</span>
                )}
              </Link>

              <Link to="/cart" className="action-icon cart-icon" aria-label="Panier">
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                )}
              </Link>

              <Link to="/support" className="action-icon service-client-icon" aria-label="Support client">
                <FaHeadset />
              </Link>

              {user ? (
                <div className="user-dropdown">
                  <button className="user-icon" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} aria-label="Menu utilisateur">
                    <FaUser />
                  </button>
                  {isUserMenuOpen && (
                    <div className="dropdown-menu user-menu">
                      <div className="user-info">Bonjour, {user.email}</div>
                      <Link to="/account" onClick={() => setIsUserMenuOpen(false)}>Mon compte</Link>
                      <Link to="/orders" onClick={() => setIsUserMenuOpen(false)}>Mes commandes</Link>
                      <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="auth-link">Connexion</Link>
                  <Link to="/register" className="auth-link signup-link">Inscription</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-menu">
            {categories.map((category) => (
              <li key={category.path}>
                <Link to={category.path} onClick={() => setIsMobileMenuOpen(false)}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
