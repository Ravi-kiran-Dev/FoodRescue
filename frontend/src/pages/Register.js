import { Grid, Box } from '@mui/material';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, MenuItem, Snackbar, Alert, FormControl, InputLabel, Select } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!name.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await register(name, email, password, role, phone);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '12px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Join our community to help reduce food waste and support those in need
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                helperText="Enter your full legal name"
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
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                helperText="We'll never share your email with anyone else"
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
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="At least 6 characters"
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>I am a...</InputLabel>
                <Select
                  value={role}
                  onChange={handleRoleChange}
                  label="I am a..."
                  style={{ fontSize: '1rem' }}
                >
                  <MenuItem value="donor">Food Donor (Restaurant/Cafe)</MenuItem>
                  <MenuItem value="ngo">NGO/Community Organization</MenuItem>
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 555-123-4567"
                InputProps={{
                  style: { fontSize: '1rem' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1rem' }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                style={{ 
                  padding: '12px', 
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </Grid>
          </Grid>
        </form>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;