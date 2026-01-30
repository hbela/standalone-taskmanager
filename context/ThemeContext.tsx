import { PurpleDarkTheme, PurpleLightTheme } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MD3Theme } from 'react-native-paper';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: MD3Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: PurpleLightTheme,
  themeMode: 'system',
  isDark: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme) {
          setThemeMode(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };
    loadTheme();
  }, []);

  // Save theme preference when it changes
  const handleSetThemeMode = async (mode: ThemeMode) => {
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
      // If currently system, assume we want to toggle away from the *current* system state
      // OR simple toggle: system -> light -> dark -> system? 
      // User asked for "light / dark mode switch". 
      // Let's implement a simple boolean toggle logic if they are ignoring system.
      // Or if currently light (system or manual) -> go dark.
      
      let newMode: ThemeMode = 'light';
      if (themeMode === 'system') {
          newMode = systemColorScheme === 'dark' ? 'light' : 'dark';
      } else {
          newMode = themeMode === 'dark' ? 'light' : 'dark';
      }
      handleSetThemeMode(newMode);
  };

  const isDark = 
    themeMode === 'dark' || 
    (themeMode === 'system' && systemColorScheme === 'dark');

  const theme = isDark ? PurpleDarkTheme : PurpleLightTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeMode, isDark, setThemeMode: handleSetThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
