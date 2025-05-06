const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');

// 📁 Dossier où les images seront stockées
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// 🔍 GET : Tous les produits
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json({ products: result.rows });
// pas { products: result.rows }
  } catch (err) {
    console.error('Erreur lors de la récupération des produits :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ➕ POST : Ajouter produit avec image locale
router.post('/products/upload', upload.single('image'), async (req, res) => {
  const { name, price, category, isNew } = req.body;
  const file = req.file;

  if (!name || !price || !category || !file) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const image_url = `http://localhost:5000/images/${file.filename}`;

  try {
    const result = await pool.query(
      `INSERT INTO products (name, category, price, image_url, is_new, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [name, category.toLowerCase(), price, image_url, isNew === 'true'] // ✅ convertit en booléen
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Erreur ajout produit avec image :', err);
    res.status(500).json({ message: 'Erreur serveur lors de l’ajout du produit' });
  }
});




router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression du produit :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// 🔍 GET : Produits marqués comme "Nouveautés"
router.get('/products/new', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE is_new = true ORDER BY created_at DESC');
    res.json({ products: result.rows });
  } catch (err) {
    console.error('Erreur chargement nouveautés :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



module.exports = router;
