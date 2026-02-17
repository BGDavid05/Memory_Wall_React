import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Container, Typography, Button, Paper, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CakeIcon from '@mui/icons-material/Cake';
import PlaceIcon from '@mui/icons-material/Place';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ThemeSwitcher from '../components/layout/ThemeSwitcher';
import { useAuth } from '../hooks/useAuth';

// Feature lists for the about sections
const preserveFeatures = [
  'Upload photos and add personal stories to create rich memory collections',
  'Organize memories by themes, events, or time periods',
  'Secure cloud storage ensures your memories are always safe',
];

const shareFeatures = [
  'Invite family and friends to view your memory walls',
  'Control privacy with customizable access permissions',
  'Create collaborative walls where others can contribute memories',
];

// Use case cards data
const useCases = [
  {
    id: 'family',
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    color: 'error.main',
    title: 'Family History',
    description: 'Preserve family stories and photos for future generations',
  },
  {
    id: 'events',
    icon: <CakeIcon sx={{ fontSize: 40 }} />,
    color: 'secondary.main',
    title: 'Special Events',
    description: 'Weddings, birthdays, graduations, and milestone celebrations',
  },
  {
    id: 'travel',
    icon: <PlaceIcon sx={{ fontSize: 40 }} />,
    color: 'info.main',
    title: 'Travel Adventures',
    description: 'Document your journeys and share travel experiences',
  },
  {
    id: 'memorial',
    icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    color: 'warning.main',
    title: 'Memorial Tributes',
    description: 'Honor loved ones with beautiful remembrance collections',
  },
];

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url(/src/assets/Main_Page.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 10, sm: 16 },
      }}
    >
      {/* Dark overlay for better text visibility */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)'),
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '4rem' },
            fontWeight: 'bold',
            color: 'common.white',
            mb: 3,
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          MemoryWall
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: 'common.white',
            mb: 4,
            fontWeight: 300,
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          Create beautiful memory walls to preserve and share your most precious moments
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
          {isAuthenticated ? (
            <Button variant="contained" size="large" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button variant="contained" size="large" onClick={() => navigate('/register')}>
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: 'common.white',
                  color: 'common.white',
                  '&:hover': {
                    borderColor: 'common.white',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}

function FeatureList({ features, iconColor }: { features: string[]; iconColor: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {features.map((text) => (
        <Box key={text} sx={{ display: 'flex', gap: 1.5 }}>
          <CheckCircleIcon sx={{ color: iconColor, flexShrink: 0, mt: 0.5 }} />
          <Typography color="text.secondary">{text}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function UseCaseCard({ useCase }: { useCase: (typeof useCases)[0] }) {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: useCase.color, width: 64, height: 64, mb: 2 }}>{useCase.icon}</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {useCase.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {useCase.description}
        </Typography>
      </Paper>
    </Grid>
  );
}

function AboutPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Theme switcher in top right corner */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
        <ThemeSwitcher />
      </Box>

      <HeroSection />

      {/* Main content section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              What is MemoryWall?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
              A platform designed to help you create digital memory walls where you can collect, organize, and share
              your most meaningful photos and memories.
            </Typography>
          </Box>

          {/* Features grid */}
          <Grid container spacing={6} sx={{ mb: 10 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Preserve Your Memories
              </Typography>
              <FeatureList features={preserveFeatures} iconColor="primary.main" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Share with Loved Ones
              </Typography>
              <FeatureList features={shareFeatures} iconColor="success.main" />
            </Grid>
          </Grid>

          {/* Use cases section */}
          <Box sx={{ mt: 10 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', mb: 6 }}>
              Perfect For
            </Typography>
            <Grid container spacing={4}>
              {useCases.map((useCase) => (
                <UseCaseCard key={useCase.id} useCase={useCase} />
              ))}
            </Grid>
          </Box>

          {/* Call to action */}
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to Start Creating?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 'md', mx: 'auto' }}>
              Join thousands of users who are already preserving their precious memories with MemoryWall. Create your
              first memory wall in minutes.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Create Your First Wall'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutPage;
