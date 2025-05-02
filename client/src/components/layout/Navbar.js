import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user, logout } = useAuth();

  const categories = ["Femmes", "Hommes", "Enfants", "Nouveautés"];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistCount(wishlist.length);
    };
    updateWishlist();
    window.addEventListener('storage', updateWishlist);
    return () => window.removeEventListener('storage', updateWishlist);
  }, []);

  const renderHeartIcon = () => wishlistCount > 0 ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1A5.5 5.5 0 0 0 3.2 12l1 1 7.6 7.6 7.6-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
    </svg>
  );

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">SmartFashion</Link>
          <nav className="nav-menu">
            {categories.map(cat => (
              <Link key={cat} to={`/${cat.toLowerCase()}`} className="nav-link">
                {cat} <FaChevronDown className="chevron" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="navbar-right">
          <input type="text" className="search" placeholder="🔍 Rechercher..." />

          <Link to="/wishlist" className="icon-link wishlist-icon">
            <span className="wishlist-wrapper">
              {renderHeartIcon()}
              <span className="wishlist-count">{wishlistCount}</span>
            </span>
          </Link>

          <Link to="/cart" className="icon-link">
            <FaShoppingCart />
          </Link>

          {user ? (
            <div className="auth-section">
              <span className="welcome-text">Bonjour, {user.name}</span>
              <button onClick={logout} className="auth-link logout-btn">Déconnexion</button>
            </div>
          ) : (
            <Link to="/login" className="icon-link">
              <FaUser />
            </Link>
          )}

          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {categories.map(cat => (
          <Link key={cat} to={`/${cat.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)}>
            {cat}
          </Link>
        ))}

        {user ? (
          <>
            <span className="welcome-text">Bonjour, {user.name}</span>
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="auth-link logout-btn"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Connexion</Link>
            <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Inscription</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
