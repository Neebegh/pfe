// server/middlewares/auth.js
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Cherche le token dans l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user; // Ajoute les informations utilisateur au request
    next(); // Passe à la prochaine étape
  });
};

module.exports = authenticateJWT;
