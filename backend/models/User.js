const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, role, phone } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.query(
      'INSERT INTO users (name, email, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, phone, created_at',
      [name, email, hashedPassword, role, phone]
    );
    
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query('SELECT id, name, email, role, phone, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, userData) {
    const { name, phone } = userData;
    const result = await db.query(
      'UPDATE users SET name = $1, phone = $2, updated_at = NOW() WHERE id = $3 RETURNING id, name, email, role, phone, updated_at',
      [name, phone, id]
    );
    return result.rows[0];
  }
}

module.exports = User;