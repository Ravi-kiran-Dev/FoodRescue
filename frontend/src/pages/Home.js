import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Home = () => {
  const { user } = useAuth();

  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography variant="h2" align="center" gutterBottom>
        FoodRescue Connect
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Connect communities with surplus food to reduce waste and fight hunger
      </Typography>
      
      {!user && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/register"
            style={{ marginRight: '20px' }}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/login"
          >
            Login
          </Button>
        </div>
      )}
      
      <Grid container spacing={4} style={{ marginTop: '50px' }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent style={{ textAlign: 'center' }}>
              <RestaurantIcon style={{ fontSize: 60, color: '#4CAF50' }} />
              <Typography variant="h5" gutterBottom>
                For Restaurants
              </Typography>
              <Typography color="text.secondary">
                Post surplus food items to help reduce waste and support your community
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent style={{ textAlign: 'center' }}>
              <PeopleIcon style={{ fontSize: 60, color: '#2196F3' }} />
              <Typography variant="h5" gutterBottom>
                For NGOs
              </Typography>
              <Typography color="text.secondary">
                Browse available food posts and claim items for your community members
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent style={{ textAlign: 'center' }}>
              <VolunteerActivismIcon style={{ fontSize: 60, color: '#FF9800' }} />
              <Typography variant="h5" gutterBottom>
                For Volunteers
              </Typography>
              <Typography color="text.secondary">
                Help coordinate food pickups and deliveries to make a difference
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <div style={{ textAlign: 'center', marginTop: '50px', padding: '30px 0' }}>
        <Typography variant="h4" gutterBottom>
          Join Our Community Today
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Together we can reduce food waste and help those in need
        </Typography>
        {user ? (
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/dashboard"
          >
            Go to Dashboard
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            component={Link} 
            to="/register"
          >
            Sign Up Now
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Home;