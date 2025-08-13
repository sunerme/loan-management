import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * 
 * Provides theme context to the application and manages theme state.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} [props.defaultTheme='light'] - Default theme to use
 */
export const ThemeProvider = ({ children, defaultTheme = 'light' }) => {
  // Initialize theme state from localStorage or default
  const [theme, setTheme] = useState(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || defaultTheme;
    }
    return defaultTheme;
  });
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Set a specific theme
  const setThemeMode = (mode) => {
    if (mode === 'light' || mode === 'dark') {
      setTheme(mode);
    }
  };
  
  // Update document attributes and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save to localStorage
      localStorage.setItem('theme', theme);
      
      // Update document attributes
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content', 
          theme === 'dark' ? '#121212' : '#ffffff'
        );
      }
    }
  }, [theme]);
  
  // Check for system preference on initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
      // Check if user has a system preference for dark mode
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode) {
        setTheme('dark');
      }
      
      // Listen for changes in system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };
      
      // Add event listener with compatibility for older browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
      
      // Cleanup function
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);
  
  // Context value
  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    isDarkMode: theme === 'dark',
    isLightMode: theme === 'light'
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * 
 * Custom hook to access the theme context.
 * 
 * @returns {Object} Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;