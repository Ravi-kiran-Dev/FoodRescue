const express = require('express');
const router = express.Router();
const foodPostController = require('../controllers/foodPostController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/', foodPostController.getAllFoodPosts);

// Protected routes
router.post('/', authenticateToken, foodPostController.createFoodPost);
router.get('/my-posts', authenticateToken, foodPostController.getUserFoodPosts);
router.get('/:id', foodPostController.getFoodPostById);
router.post('/:id/claim', authenticateToken, foodPostController.claimFoodPost);
router.delete('/:id', authenticateToken, foodPostController.deleteFoodPost);

module.exports = router;