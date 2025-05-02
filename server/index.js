// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');



const app = express();

// Middlewares
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api/reviews', reviewRoutes);

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
