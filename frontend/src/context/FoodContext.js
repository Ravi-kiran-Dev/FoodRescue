import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const FoodContext = createContext();

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};

export const FoodProvider = ({ children }) => {
  const [foodPosts, setFoodPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const fetchFoodPosts = async () => {
    setLoading(true);
    
    try {
      const response = await api.get('/food-posts');
      setFoodPosts(response.data);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error fetching food posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get('/food-posts/my-posts');
      setUserPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const fetchUserClaims = async () => {
    try {
      const response = await api.get('/claims/my-claims');
      setClaims(response.data);
    } catch (error) {
      console.error('Error fetching user claims:', error);
    }
  };

  const createFoodPost = async (postData) => {
    try {
      const response = await api.post('/food-posts', postData);
      await fetchUserPosts();
      await fetchFoodPosts();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to create post' };
    }
  };

  const claimFoodPost = async (postId, pickupTime) => {
    try {
      const response = await api.post(`/food-posts/${postId}/claim`, { pickupTime });
      await fetchFoodPosts();
      await fetchUserClaims();
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to claim food' };
    }
  };

  const deleteFoodPost = async (postId) => {
    try {
      await api.delete(`/food-posts/${postId}`);
      await fetchUserPosts();
      await fetchFoodPosts();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Failed to delete post' };
    }
  };

  const value = {
    foodPosts,
    userPosts,
    claims,
    loading,
    lastUpdated,
    fetchFoodPosts,
    fetchUserPosts,
    fetchUserClaims,
    createFoodPost,
    claimFoodPost,
    deleteFoodPost
  };

  return (
    <FoodContext.Provider value={value}>
      {children}
    </FoodContext.Provider>
  );
};