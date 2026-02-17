import { useState } from 'react';
import { Box, IconButton, Drawer, Typography, useTheme as useMuiTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme as useThemeContext } from '../../hooks/useTheme';
import DrawerContent from './DrawerContent';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'My Walls', path: '/my-walls', icon: <FolderIcon /> },
  { label: 'Shared Walls', path: '/shared-walls', icon: <PeopleIcon /> },
  { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
];

const drawerWidth = 240;
const drawerWidthCollapsed = 70;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toggleTheme, mode, colorScheme, setColorScheme } = useThemeContext();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isCollapsed = !isMobile && !desktopOpen;

  // Get sidebar background from theme
  const themeBackground = (theme as { sidebarBackground?: string }).sidebarBackground;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'primary.main',
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Memory Wall
          </Typography>
        </Box>
      )}

      {/* Desktop Permanent Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: desktopOpen ? drawerWidth : drawerWidthCollapsed,
            flexShrink: 0,
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: desktopOpen ? drawerWidth : drawerWidthCollapsed,
              boxSizing: 'border-box',
              border: 'none',
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
            },
          }}
        >
          <DrawerContent
            navItems={navItems}
            currentPath={location.pathname}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            userName={user?.name || 'User'}
            userEmail={user?.email || 'user@example.com'}
            themeMode={mode}
            colorScheme={colorScheme}
            onNavigation={handleNavigation}
            onDesktopDrawerToggle={handleDesktopDrawerToggle}
            onMobileDrawerToggle={handleDrawerToggle}
            onToggleTheme={toggleTheme}
            onColorSchemeChange={setColorScheme}
            onLogout={handleLogout}
            themeBackground={themeBackground}
          />
        </Drawer>
      )}

      {/* Mobile Temporary Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <DrawerContent
            navItems={navItems}
            currentPath={location.pathname}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            userName={user?.name || 'User'}
            userEmail={user?.email || 'user@example.com'}
            themeMode={mode}
            colorScheme={colorScheme}
            onNavigation={handleNavigation}
            onDesktopDrawerToggle={handleDesktopDrawerToggle}
            onMobileDrawerToggle={handleDrawerToggle}
            onToggleTheme={toggleTheme}
            onColorSchemeChange={setColorScheme}
            onLogout={handleLogout}
            themeBackground={themeBackground}
          />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            md: `calc(100% - ${desktopOpen ? drawerWidth : drawerWidthCollapsed}px)`,
          },
          mt: isMobile ? 8 : 0,
          bgcolor: 'background.default',
          minHeight: '100vh',
          transition: 'width 0.3s ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
