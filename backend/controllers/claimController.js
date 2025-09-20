const Claim = require('../models/Claim');

const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.findByUserId(req.user.id);
    res.json(claims);
  } catch (error) {
    console.error('Get user claims error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getClaimsForFoodPost = async (req, res) => {
  try {
    const { foodPostId } = req.params;
    const claims = await Claim.findByFoodPostId(foodPostId);
    res.json(claims);
  } catch (error) {
    console.error('Get claims for food post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const claim = await Claim.updateStatus(id, status);
    res.json(claim);
  } catch (error) {
    console.error('Update claim status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserClaims,
  getClaimsForFoodPost,
  updateClaimStatus
};