// server/middlewares/verifyAdmin.js

const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.is_admin !== true) {
      return res.status(403).json({ message: 'Accès refusé : admin uniquement.' });
    }
    next();
  };
  
  module.exports = verifyAdmin;
  