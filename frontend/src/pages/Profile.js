import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await updateProfile({ name, phone });
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!user) {
    return (
      <Container style={{ marginTop: '30px' }}>
        <Typography variant="h4" align="center">
          Please log in to view your profile
        </Typography>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={user.email}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Role"
                fullWidth
                value={user.role}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
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
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;