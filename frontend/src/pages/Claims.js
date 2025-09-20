import React, { useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { useFood } from '../context/FoodContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Claims = () => {
  const { claims, fetchUserClaims, loading } = useFood();

  useEffect(() => {
    fetchUserClaims();
  }, [fetchUserClaims]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Your Claims
      </Typography>
      
      {loading ? (
        <Typography>Loading...</Typography>
      ) : claims.length === 0 ? (
        <Typography>You haven't claimed any food items yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {claims.map((claim) => (
            <Grid item xs={12} md={6} key={claim.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {claim.food_title}
                  </Typography>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <LocationOnIcon fontSize="small" style={{ marginRight: '5px' }} />
                    <Typography variant="body2">{claim.pickup_address}</Typography>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <AccessTimeIcon fontSize="small" style={{ marginRight: '5px' }} />
                    <Typography variant="body2">
                      Pickup: {formatDate(claim.pickup_time)} at {formatTime(claim.pickup_time)}
                    </Typography>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <Typography variant="body2">
                      Donor: {claim.donor_name}
                    </Typography>
                  </div>
                  
                  <Chip 
                    label={claim.status} 
                    color={claim.status === 'pending' ? 'primary' : claim.status === 'confirmed' ? 'secondary' : 'default'} 
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Claims;