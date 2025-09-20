const db = require('../config/db');

class Claim {
  static async create(claimData) {
    const { foodPostId, claimedBy, pickupTime } = claimData;
    const result = await db.query(
      'INSERT INTO claims (food_post_id, claimed_by, pickup_time) VALUES ($1, $2, $3) RETURNING *',
      [foodPostId, claimedBy, pickupTime]
    );
    return result.rows[0];
  }

  static async findByFoodPostId(foodPostId) {
    const result = await db.query(
      `SELECT c.*, u.name as claimer_name, u.phone as claimer_phone 
       FROM claims c 
       JOIN users u ON c.claimed_by = u.id 
       WHERE c.food_post_id = $1 
       ORDER BY c.created_at DESC`,
      [foodPostId]
    );
    return result.rows;
  }

  static async findByUserId(userId) {
    const result = await db.query(
      `SELECT c.*, fp.title as food_title, fp.pickup_address, fp.expiry, u.name as donor_name 
       FROM claims c 
       JOIN food_posts fp ON c.food_post_id = fp.id 
       JOIN users u ON fp.user_id = u.id 
       WHERE c.claimed_by = $1 
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await db.query(
      'UPDATE claims SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = Claim;