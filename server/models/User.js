const pool = require('../db'); // Chemin selon où est ton db.js

// Fonction pour créer un utilisateur
const createUser = async (username, email, password) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};

// Fonction pour trouver un utilisateur par email
const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur:', error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail };
