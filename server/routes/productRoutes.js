// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Connexion PostgreSQL

// GET /api/products - Récupérer tous les produits
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    console.log(result.rows); // Ajoute cette ligne avant res.json(...)

    res.json({ success: true, products: result.rows });
  } catch (err) {
    console.error('Erreur lors du chargement des produits :', err);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;
