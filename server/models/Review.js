const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: String,
  sizeAccuracy: { type: Number, min: 1, max: 5 }, // 1 = très différent, 5 = exact
  colorAccuracy: { type: Number, min: 1, max: 5 },
  fit: String, // 'too small', 'true to size', 'too large'
  photos: [String], // Photos réelles du produit
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);