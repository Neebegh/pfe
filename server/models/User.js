const pool = require('../db');

// 🔐 Créer un utilisateur
const createUser = async (username, email, password_hash) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password_hash]
  );
  return result.rows[0];
};

// 🔎 Trouver un utilisateur par email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT id, username, email, password_hash, is_admin FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
