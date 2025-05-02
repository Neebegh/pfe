// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Connexion PostgreSQL

// GET /api/products/:id - Récupérer un produit par ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur lors de la récupération du produit :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
