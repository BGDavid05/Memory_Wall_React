import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import type { UserStats } from '../../api/services/authService';

interface StatsCardsProps {
  stats: UserStats | undefined;
  fallbackMyWallsCount?: number;
  fallbackSharedWallsCount?: number;
  fallbackTotalMemories?: number;
  fallbackTotalMembers?: number;
}

export default function StatsCards({
  stats,
  fallbackMyWallsCount = 0,
  fallbackSharedWallsCount = 0,
  fallbackTotalMemories = 0,
  fallbackTotalMembers = 0,
}: StatsCardsProps) {
  const statItems = [
    {
      label: 'My Walls',
      value: stats?.myWallsCount ?? fallbackMyWallsCount,
      icon: HomeIcon,
      color: 'primary.main',
      bgcolor: 'primary.light',
    },
    {
      label: 'Shared with Me',
      value: stats?.sharedWallsCount ?? fallbackSharedWallsCount,
      icon: PeopleIcon,
      color: 'success.main',
      bgcolor: 'success.light',
    },
    {
      label: 'Total Memories',
      value: stats?.totalMemoriesCount ?? fallbackTotalMemories,
      icon: FavoriteIcon,
      color: 'secondary.main',
      bgcolor: 'secondary.light',
    },
    {
      label: 'Total Members',
      value: stats?.totalUniqueMembersCount ?? fallbackTotalMembers,
      icon: GroupIcon,
      color: 'warning.main',
      bgcolor: 'warning.light',
    },
  ];

  return (
    <Grid container spacing={2}>
      {statItems.map((item) => (
        <Grid key={item.label} size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card
            elevation={4}
            sx={{
              borderRadius: 2.5,
              height: '100%',
              transition: 'all 0.6s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: 110,
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: item.bgcolor,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    flexShrink: 0,
                  }}
                >
                  <item.icon sx={{ fontSize: 26 }} />
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.25, fontWeight: 500, fontSize: '0.8rem' }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
