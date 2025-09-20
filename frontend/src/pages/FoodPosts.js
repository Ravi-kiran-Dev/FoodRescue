import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Chip, CircularProgress, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useFood } from '../context/FoodContext';

const FoodPosts = () => {
  const { foodPosts, loading, lastUpdated, fetchFoodPosts } = useFood();
  const [showLoading, setShowLoading] = useState(false);
  const isInitialLoad = useRef(true);

  // Fetch data when component mounts
  useEffect(() => {
    fetchFoodPosts();
    isInitialLoad.current = false;
  }, [fetchFoodPosts]);

  const handleRefresh = async () => {
    setShowLoading(true);
    await fetchFoodPosts();
    // Small delay to ensure smooth transition
    setTimeout(() => setShowLoading(false), 300);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleClaim = (postId) => {
    alert('Claim functionality would open here');
  };

  // For initial load, show loading spinner
  if (isInitialLoad.current && loading) {
    return (
      <Container style={{ marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom>
          Available Food Posts
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Available Food Posts
        </Typography>
        <Button 
          variant="outlined" 
          size="small"
          onClick={handleRefresh}
          disabled={showLoading}
        >
          {showLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>
      
      {foodPosts.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No food items available at the moment.
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ marginTop: '10px' }}>
            Please check back later or be the first to post!
          </Typography>
          <Box mt={3}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleRefresh}
              disabled={showLoading}
            >
              {showLoading ? 'Refreshing...' : 'Refresh Now'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {foodPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <Card 
                elevation={3} 
                style={{ 
                  borderRadius: '12px', 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <CardContent style={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h3">
                      {post.title}
                    </Typography>
                    <Chip 
                      label={post.status} 
                      color={post.status === 'available' ? 'success' : 'default'} 
                      size="small"
                      style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph style={{ minHeight: '60px' }}>
                    {post.description}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" style={{ marginRight: '8px', color: '#4CAF50' }} />
                    <Typography variant="body2" style={{ fontSize: '0.875rem' }}>
                      {post.pickup_address}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" alignItems="center" mb={2}>
                    <AccessTimeIcon fontSize="small" style={{ marginRight: '8px', color: '#FF9800' }} />
                    <Typography variant="body2" style={{ fontSize: '0.875rem' }}>
                      Expires: {formatDate(post.expiry)}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    disabled={post.status !== 'available'}
                    onClick={() => handleClaim(post.id)}
                    style={{ 
                      padding: '10px',
                      fontWeight: '600',
                      textTransform: 'none',
                      marginTop: 'auto'
                    }}
                  >
                    {post.status === 'available' ? 'Claim Food' : 'Already Claimed'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FoodPosts;