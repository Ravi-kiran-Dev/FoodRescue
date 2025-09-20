const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const { authenticateToken } = require('../middleware/auth');

router.get('/my-claims', authenticateToken, claimController.getUserClaims);
router.get('/food-post/:foodPostId', authenticateToken, claimController.getClaimsForFoodPost);
router.put('/:id/status', authenticateToken, claimController.updateClaimStatus);

module.exports = router;