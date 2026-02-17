import { Box, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigationList from './NavigationList';
import UserSection from './UserSection';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface DrawerContentProps {
  navItems: NavItem[];
  currentPath: string;
  isCollapsed: boolean;
  isMobile: boolean;
  userName: string;
  userEmail: string;
  themeMode: 'light' | 'dark';
  colorScheme: 'blue' | 'green';
  onNavigation: (path: string) => void;
  onDesktopDrawerToggle: () => void;
  onMobileDrawerToggle: () => void;
  onToggleTheme: () => void;
  onColorSchemeChange: (scheme: 'blue' | 'green') => void;
  onLogout: () => void;
  themeBackground: string;
}

export default function DrawerContent({
  navItems,
  currentPath,
  isCollapsed,
  isMobile,
  userName,
  userEmail,
  themeMode,
  colorScheme,
  onNavigation,
  onDesktopDrawerToggle,
  onMobileDrawerToggle,
  onToggleTheme,
  onColorSchemeChange,
  onLogout,
  themeBackground,
}: DrawerContentProps) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: themeBackground,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          color: 'white',
        }}
      >
        {!isCollapsed && (
          <>
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 0.5 }}>
              Memory Wall
            </Typography>

            {!isMobile && (
              <Tooltip title="Collapse sidebar" placement="right">
                <IconButton
                  onClick={onDesktopDrawerToggle}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <MenuIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            )}
          </>
        )}

        {isCollapsed && !isMobile && (
          <Tooltip title="Expand sidebar" placement="right">
            <IconButton
              onClick={onDesktopDrawerToggle}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        )}

        {isMobile && (
          <IconButton onClick={onMobileDrawerToggle} sx={{ color: 'white' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />

      {/* Navigation List */}
      <NavigationList
        navItems={navItems}
        currentPath={currentPath}
        isCollapsed={isCollapsed}
        onNavigation={onNavigation}
      />

      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />

      {/* User Section */}
      <UserSection
        userName={userName}
        userEmail={userEmail}
        isCollapsed={isCollapsed}
        themeMode={themeMode}
        colorScheme={colorScheme}
        onToggleTheme={onToggleTheme}
        onColorSchemeChange={onColorSchemeChange}
        onLogout={onLogout}
      />
    </Box>
  );
}
