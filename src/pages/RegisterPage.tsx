import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Paper, Link } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import ThemeSwitcher from '../components/layout/ThemeSwitcher';

function RegisterPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      {/* Theme switcher */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeSwitcher />
      </Box>

      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Join MemoryWall today
          </Typography>

          <RegisterForm onSuccess={handleSuccess} />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" underline="hover">
                Sign in
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/" underline="hover" variant="body2">
              Back to home
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;
