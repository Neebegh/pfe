// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars, FaTimes, FaChevronDown, FaHeadset } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <div className="top-promo-bar">
        <div className="promo-content">
          Livraison gratuite à partir de 200 DT | Retours sous 30 jours
        </div>
        <div className="locale-selector">
          <select aria-label="Langue">
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

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
            <div className="navbar-search">
              <form onSubmit={handleSearch} role="search">
                <div className="search-group">
                  <input
                    type="search"
                    placeholder="Rechercher des produits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" aria-label="Rechercher" className="search-button"><FaSearch /></button>
                </div>
              </form>
            </div>

            <div className="action-icons">
              <Link to="/wishlist" className="action-icon" aria-label="Liste de souhaits">
                <FaHeart />
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
          <div className="mobile-search">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit"><FaSearch /></button>
            </form>
          </div>

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