const db = require('../db');

// ✅ Créer un avis
const createReview = async (req, res) => {
  const { productId } = req.params;
  const { userEmail, userName, comment, productImage, productName } = req.body;

  console.log('📥 Données reçues :', { productId, userEmail, userName, comment, productImage, productName });

  try {
    const user = await db.query('SELECT id FROM users WHERE email = $1', [userEmail]);
    if (user.rows.length === 0) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    const userId = user.rows[0].id;

    const result = await db.query(`
      INSERT INTO reviews (user_id, product_id, comment, user_name, user_email, product_image, product_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [userId, productId, comment, userName, userEmail, productImage, productName]);

    res.status(201).json({ message: 'Avis ajouté', review: result.rows[0] });
  } catch (err) {
    console.error('❌ Erreur serveur :', err.message);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Récupérer les avis d’un produit
const getReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await db.query(`
      SELECT id, comment, user_name, product_name, product_image, created_at
      FROM reviews
      WHERE product_id = $1
      ORDER BY created_at DESC;
    `, [productId]);

    res.status(200).json({ reviews: result.rows });
  } catch (err) {
    console.error('❌ Erreur lors de la récupération des avis :', err.message);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Supprimer un avis
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const result = await db.query('DELETE FROM reviews WHERE id = $1', [reviewId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }
    res.status(200).json({ message: 'Avis supprimé avec succès' });
  } catch (err) {
    console.error('❌ Erreur serveur lors de la suppression :', err.message);
    res.status(500).json({ message: err.message });
  }
};
// ✅ Mettre à jour un avis

const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { comment } = req.body;

  try {
    const result = await db.query(
      'UPDATE reviews SET comment = $1 WHERE id = $2 RETURNING *;',
      [comment, reviewId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Avis non trouvé' });
    }

    res.status(200).json({ message: 'Avis mis à jour', review: result.rows[0] });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'avis:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
  updateReview // 👈 ajoute cette ligne
};
