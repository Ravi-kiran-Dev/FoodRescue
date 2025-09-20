import React, { useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFood } from '../context/FoodContext';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const { user } = useAuth();
  const { fetchUserPosts, fetchUserClaims, userPosts, claims } = useFood();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserPosts();
      fetchUserClaims();
    }
  }, [user, fetchUserPosts, fetchUserClaims]);

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: '50px' }}>
          Please log in to view your dashboard
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}!
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <RestaurantIcon style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                Your Food Posts
              </Typography>
              <Typography variant="h3" color="primary">
                {userPosts.length}
              </Typography>
              <Typography color="text.secondary">
                Food items you've posted
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/post-food"
                style={{ marginTop: '15px' }}
                startIcon={<AddIcon />}
              >
                Post New Food
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <AssignmentIcon style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                Your Claims
              </Typography>
              <Typography variant="h3" color="secondary">
                {claims.length}
              </Typography>
              <Typography color="text.secondary">
                Food items you've claimed
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/claims"
                style={{ marginTop: '15px' }}
              >
                View Claims
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card style={{ marginTop: '30px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/food-posts"
              >
                Browse Available Food
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/profile"
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;