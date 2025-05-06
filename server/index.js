// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/reports', reportRoutes);

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
