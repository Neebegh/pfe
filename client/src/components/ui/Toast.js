// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/api/reports', async (req, res) => {
  const {
    productId,
    productName,
    productImage,
    userId,
    userEmail,
    issueType,
    comment
  } = req.body;

  try {
    const query = `
      INSERT INTO reports
      (product_id, product_name, product_image, user_id, user_email, issue_type, comment)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await pool.query(query, [
      productId,
      productName,
      productImage,
      userId,
      userEmail,
      issueType,
      comment
    ]);

    res.status(200).json({ message: '✅ Signalement enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'insertion :', error);
    res.status(500).json({ message: '❌ Erreur serveur.' });
  }
});

module.exports = router;
