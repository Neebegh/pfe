const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const {
    productId,
    productName,
    productImage,
    userEmail,
    issueType,
    comment
  } = req.body;

  console.log("📥 Données reçues :", req.body);

  if (!productId || !productName || !userEmail || !issueType || !comment.trim()) {
    console.log("🚫 Champs manquants !");
    return res.status(400).json({ message: 'Champs obligatoires manquants' });
  }

  try {
    const insertQuery = `
      INSERT INTO reports (product_id, product_name, product_image, user_email, issue_type, comment)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [productId, productName, productImage, userEmail, issueType, comment];

    console.log("🔁 Tentative d'insertion dans la BDD...");
    await pool.query(insertQuery, values);

    console.log("✅ Insertion réussie !");
    res.status(200).json({ message: 'Signalement enregistré avec succès.' });
  } catch (err) {
    console.error('❌ Erreur SQL complète :', err); // ✅ Log complet
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('❌ Erreur lors du fetch :', err.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.params;
  console.log('🧨 Requête DELETE reçue pour l’ID :', id);

  try {
    const result = await pool.query('DELETE FROM reports WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      console.log('⚠️ Aucun signalement trouvé pour l’ID :', id);
      return res.status(404).json({ message: 'Signalement non trouvé.' });
    }

    console.log('✅ Suppression réussie.');
    res.json({ message: 'Signalement supprimé avec succès.' });

  } catch (err) {
    console.error('❌ Erreur SQL suppression :', err);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression.' });
  }
});


module.exports = router;
