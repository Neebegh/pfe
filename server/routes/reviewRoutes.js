const express = require('express');
const router = express.Router();
const pool = require('../db'); // ✅ NÉCESSAIRE pour accéder à la base PostgreSQL

const {
  createReview,
  getReviews,
  deleteReview,
  updateReview
} = require('../controllers/reviewController');

// Routes principales
router.post('/:productId', createReview);
router.delete('/:reviewId', deleteReview);
router.put('/update/:reviewId', updateReview);

// ✅ Route d’administration pour tout afficher
// ✅ PLACE CETTE ROUTE EN PREMIER
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, product_id, user_id, user_email, user_name, comment, rating,
        product_image, product_name, created_at
      FROM reviews
      ORDER BY created_at DESC
    `);
    res.json({ reviews: result.rows });
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ❌ CETTE ROUTE ÉTAIT AVANT, MAIS ELLE CAPTURE « all » COMME ID
router.get('/:productId', getReviews);

module.exports = router;
