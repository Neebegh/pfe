// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'ton_mot_de_passe',
  database: process.env.DB_NAME || 'nom_de_ta_base',
});

pool.on('error', (err) => {
  console.error('❌ Erreur inattendue sur le client PostgreSQL :', err);
  process.exit(-1);
});

module.exports = pool;
