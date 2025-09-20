import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  marginTop: 'auto',
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          FoodRescue Connect {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;