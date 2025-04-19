const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  brandSize: String,
  chest: Number,
  waist: Number,
  hips: Number,
  length: Number
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [sizeSchema],
  images: [String],
  sizeChart: String, // URL to size chart image
  material: String,
  color: String,
  actualColor: String, // Added by users who bought it
  actualFit: String, // Added by users ('runs large', 'runs small')
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);