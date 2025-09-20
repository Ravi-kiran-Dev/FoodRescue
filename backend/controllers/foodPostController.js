const FoodPost = require('../models/FoodPost');
const Claim = require('../models/Claim');

const createFoodPost = async (req, res) => {
  try {
    const { title, description, imageUrl, location, pickupAddress, expiry } = req.body;
    
    const foodPost = await FoodPost.create({
      userId: req.user.id,
      title,
      description,
      imageUrl,
      location,
      pickupAddress,
      expiry
    });
    
    res.status(201).json(foodPost);
  } catch (error) {
    console.error('Create food post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllFoodPosts = async (req, res) => {
  try {
    const foodPosts = await FoodPost.findAllAvailable();
    res.json(foodPosts);
  } catch (error) {
    console.error('Get food posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFoodPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodPost = await FoodPost.findById(id);
    
    if (!foodPost) {
      return res.status(404).json({ error: 'Food post not found' });
    }
    
    res.json(foodPost);
  } catch (error) {
    console.error('Get food post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserFoodPosts = async (req, res) => {
  try {
    const foodPosts = await FoodPost.findByUserId(req.user.id);
    res.json(foodPosts);
  } catch (error) {
    console.error('Get user food posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const claimFoodPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { pickupTime } = req.body;
    
    // Check if food post exists and is available
    const foodPost = await FoodPost.findById(id);
    if (!foodPost) {
      return res.status(404).json({ error: 'Food post not found' });
    }
    
    if (foodPost.status !== 'available') {
      return res.status(400).json({ error: 'Food post is not available' });
    }
    
    // Create claim
    const claim = await Claim.create({
      foodPostId: id,
      claimedBy: req.user.id,
      pickupTime
    });
    
    // Update food post status
    await FoodPost.updateStatus(id, 'claimed');
    
    res.status(201).json(claim);
  } catch (error) {
    console.error('Claim food post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteFoodPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user owns this food post
    const foodPost = await FoodPost.findById(id);
    if (!foodPost) {
      return res.status(404).json({ error: 'Food post not found' });
    }
    
    if (foodPost.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this food post' });
    }
    
    const deletedPost = await FoodPost.delete(id);
    res.json({ message: 'Food post deleted successfully', post: deletedPost });
  } catch (error) {
    console.error('Delete food post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createFoodPost,
  getAllFoodPosts,
  getFoodPostById,
  getUserFoodPosts,
  claimFoodPost,
  deleteFoodPost
};