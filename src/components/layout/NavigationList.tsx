import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavigationListProps {
  navItems: NavItem[];
  currentPath: string;
  isCollapsed: boolean;
  onNavigation: (path: string) => void;
}

export default function NavigationList({ navItems, currentPath, isCollapsed, onNavigation }: NavigationListProps) {
  return (
    <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Tooltip key={item.path} title={isCollapsed ? item.label : ''} placement="right">
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  color: 'rgba(255, 255, 255, 0.7)',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  px: isCollapsed ? 1 : 2,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                  },
                  ...(isActive && {
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: isCollapsed ? 0 : 40,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        );
      })}
    </List>
  );
}
