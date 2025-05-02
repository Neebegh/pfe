const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews,
  deleteReview,
  updateReview // 👈 ajoute cette ligne
} = require('../controllers/reviewController');

router.post('/:productId', createReview);
router.get('/:productId', getReviews);
router.delete('/:reviewId', deleteReview);
router.put('/update/:reviewId', updateReview); // 👈 nouvelle route

module.exports = router;
