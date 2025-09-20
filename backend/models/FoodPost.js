const db = require('../config/db');

class FoodPost {
  static async create(postData) {
    const { userId, title, description, imageUrl, location, pickupAddress, expiry } = postData;
    const result = await db.query(
      'INSERT INTO food_posts (user_id, title, description, image_url, location, pickup_address, expiry) VALUES ($1, $2, $3, $4, POINT($5, $6), $7, $8) RETURNING *',
      [userId, title, description, imageUrl, location.lat, location.lng, pickupAddress, expiry]
    );
    return result.rows[0];
  }

  static async findAllAvailable() {
    const result = await db.query(
      `SELECT fp.*, u.name as donor_name, u.phone as donor_phone 
       FROM food_posts fp 
       JOIN users u ON fp.user_id = u.id 
       WHERE fp.status = 'available' AND fp.expiry > NOW()
       ORDER BY fp.created_at DESC`
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query(
      `SELECT fp.*, u.name as donor_name, u.phone as donor_phone 
       FROM food_posts fp 
       JOIN users u ON fp.user_id = u.id 
       WHERE fp.id = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await db.query(
      'SELECT * FROM food_posts WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await db.query(
      'UPDATE food_posts SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM food_posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = FoodPost;