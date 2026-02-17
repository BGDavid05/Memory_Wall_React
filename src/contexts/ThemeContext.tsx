import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, green } from '@mui/material/colors';

type ThemeMode = 'light' | 'dark';
type ColorScheme = 'blue' | 'green';

interface ThemeContextType {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Create theme based on mode and color scheme
const createAppTheme = (mode: ThemeMode, colorScheme: ColorScheme) => {
  const isLight = mode === 'light';
  const colors = colorScheme === 'blue' ? blue : green;

  // Create sidebar gradient
  const sidebarBackground = isLight
    ? `linear-gradient(180deg, ${colors[600]} 0%, ${colors[800]} 100%)`
    : `linear-gradient(180deg, ${colors[900]} 0%, ${colors[700]} 100%)`;

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? colors[700] : colors[200],
      },
      secondary: {
        main: isLight ? colors[500] : colors[400],
      },
      background: {
        default: isLight ? '#f5f5f5' : '#121212',
        paper: isLight ? '#ffffff' : '#1e1e1e',
      },
    },
  });

  // Add custom property for sidebar
  return {
    ...theme,
    sidebarBackground,
  };
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('blue');

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }

    const savedColorScheme = localStorage.getItem('color-scheme') as ColorScheme;
    if (savedColorScheme && (savedColorScheme === 'blue' || savedColorScheme === 'green')) {
      setColorSchemeState(savedColorScheme);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    localStorage.setItem('color-scheme', scheme);
  };

  // Create theme based on current mode and color scheme
  const theme = useMemo(() => createAppTheme(mode, colorScheme), [mode, colorScheme]);

  const value = useMemo(() => ({ mode, colorScheme, toggleTheme, setColorScheme }), [mode, colorScheme]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
