
router.get('/all', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json({ reviews: result.rows });
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


