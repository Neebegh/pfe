import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Vous pouvez créer ce fichier CSS si nécessaire

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>A propos</h4>
          <ul>
          <li>
  <a href="/notre-histoire" className="hover:underline">Notre histoire</a>
</li>            <li><Link to="/carrieres">Carrières</Link></li>
            <li><Link to="/presse">Presse</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Aide</h4>
          <ul>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/Retours">Retours</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Réseaux sociaux</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SmartFashion. Tous droits réservés.</p>
      </div>
    </footer>
  ); 
};

export default Footer;