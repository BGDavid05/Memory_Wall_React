import { Box, Typography, Card, CardContent, Grid, Button, Divider } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useUserStats } from '../hooks/useWalls';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { data: stats } = useUserStats();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* User Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{user?.name}</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{user?.email}</Typography>
              </Box>
              <Button variant="outlined" color="error" onClick={handleLogout} fullWidth>
                Logout
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* User Stats */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    My Walls
                  </Typography>
                  <Typography variant="h5">{stats?.myWallsCount || 0}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Shared Walls
                  </Typography>
                  <Typography variant="h5">{stats?.sharedWallsCount || 0}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Memories
                  </Typography>
                  <Typography variant="h5">{stats?.totalMemoriesCount || 0}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Members
                  </Typography>
                  <Typography variant="h5">{stats?.totalUniqueMembersCount || 0}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    My Walls Memories
                  </Typography>
                  <Typography variant="body1">{stats?.myWallsMemoriesCount || 0}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Shared Walls Memories
                  </Typography>
                  <Typography variant="body1">{stats?.sharedWallsMemoriesCount || 0}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
