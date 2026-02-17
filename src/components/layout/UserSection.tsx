import { Box, Typography, IconButton, Tooltip, Avatar, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircleIcon from '@mui/icons-material/Circle';

interface UserSectionProps {
  userName: string;
  userEmail: string;
  isCollapsed: boolean;
  themeMode: 'light' | 'dark';
  colorScheme: 'blue' | 'green';
  onToggleTheme: () => void;
  onColorSchemeChange: (scheme: 'blue' | 'green') => void;
  onLogout: () => void;
}

export default function UserSection({
  userName,
  userEmail,
  isCollapsed,
  themeMode,
  colorScheme,
  onToggleTheme,
  onColorSchemeChange,
  onLogout,
}: UserSectionProps) {
  return (
    <Box sx={{ p: 2, color: 'white' }}>
      {/* Color Scheme Selector - Only show when not collapsed */}
      {!isCollapsed && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1, display: 'block' }}>
            Theme Color
          </Typography>
          <ToggleButtonGroup
            value={colorScheme}
            exclusive
            onChange={(_, newScheme) => newScheme && onColorSchemeChange(newScheme)}
            size="small"
            fullWidth
            sx={{
              '& .MuiToggleButton-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&.Mui-selected': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
          >
            <ToggleButton value="blue">
              <CircleIcon sx={{ fontSize: 14, mr: 0.5, color: '#2196f3' }} />
              Blue
            </ToggleButton>
            <ToggleButton value="green">
              <CircleIcon sx={{ fontSize: 14, mr: 0.5, color: '#4caf50' }} />
              Green
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      <Stack direction={isCollapsed ? 'column' : 'row'} spacing={isCollapsed ? 1 : 2} alignItems="center">
        <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>{userName.charAt(0).toUpperCase()}</Avatar>

        {!isCollapsed && (
          <Box sx={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
            <Typography variant="subtitle2" noWrap>
              {userName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {userEmail}
            </Typography>
          </Box>
        )}

        {!isCollapsed && (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton
                size="small"
                onClick={onToggleTheme}
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {themeMode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                size="small"
                onClick={onLogout}
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        {isCollapsed && (
          <>
            <Tooltip title={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton
                size="small"
                onClick={onToggleTheme}
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {themeMode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                size="small"
                onClick={onLogout}
                sx={{
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </Box>
  );
}
