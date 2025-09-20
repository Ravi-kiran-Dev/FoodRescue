import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Grid, Snackbar, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFood } from '../context/FoodContext';

const PostFood = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { createFoodPost } = useFood();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate form
    if (!title || !description || !pickupAddress || !expiryDate || !expiryTime) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    // Combine date and time properly
    const expiryDateTime = `${expiryDate}T${expiryTime}:00`;
    
    // Simple location (you might want to implement geolocation later)
    const postData = {
      title: title.trim(),
      description: description.trim(),
      pickupAddress: pickupAddress.trim(),
      expiry: expiryDateTime,
      // For now, we'll use a default location (New York City)
      // In a real app, you'd get this from user's location or map selection
      location: {
        lat: 40.7128,
        lng: -74.0060
      }
    };
    
    console.log('Sending data:', postData); // For debugging
    
    try {
      const result = await createFoodPost(postData);
      
      if (result.success) {
        setSuccess(true);
        // Reset form
        setTitle('');
        setDescription('');
        setPickupAddress('');
        setExpiryDate('');
        setExpiryTime('');
        // Redirect after success
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(result.error || 'Failed to create food post');
      }
    } catch (err) {
      console.error('Error creating food post:', err);
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '12px' }}>
        <Typography variant="h4" gutterBottom align="center">
          Post New Food Item
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          Help reduce food waste by sharing surplus food with your community
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Food Title *"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                helperText="Brief description of the food item"
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Description *"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                helperText="Detailed description of the food item, quantity, and any special instructions"
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Pickup Address *"
                fullWidth
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                required
                helperText="Full address where the food can be picked up"
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '10px' }}>
                Expiry Date and Time *
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Expiry Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                required
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  style={{ 
                    flex: 1,
                    padding: '12px', 
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  {loading ? 'Posting...' : 'Post Food'}
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                  style={{ 
                    flex: 1,
                    padding: '12px', 
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={success} autoHideDuration={2000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => setSuccess(false)}>
          Food post created successfully! Redirecting to dashboard...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostFood;