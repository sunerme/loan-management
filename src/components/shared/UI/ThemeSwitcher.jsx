import React, { useState, useEffect } from 'react';

/**
 * ThemeSwitcher Component
 * 
 * A component that allows users to switch between light and dark themes.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.defaultTheme='light'] - The default theme to use
 * @param {Function} [props.onThemeChange] - Callback function when theme changes
 * @param {string} [props.className] - Additional CSS classes
 */
const ThemeSwitcher = ({
  defaultTheme = 'light',
  onThemeChange,
  className = '',
  ...rest
}) => {
  // Initialize theme state from localStorage or default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || defaultTheme;
  });
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Call the callback if provided
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };
  
  // Update document attributes and localStorage when theme changes
  useEffect(() => {
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
  }, [theme]);
  
  return (
    <button
      className={`theme-switcher ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      {...rest}
    >
      <div className="theme-switcher-icon">
        {theme === 'light' ? (
          <svg className="moon-icon" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 11.807C10.7418 10.5483 9.88488 8.94484 9.53762 7.1993C9.19037 5.45375 9.36832 3.64444 10.049 2C8.10826 2.38205 6.3256 3.33431 4.92899 4.735C1.02399 8.64 1.02399 14.972 4.92899 18.877C8.83499 22.783 15.166 22.782 19.072 18.877C20.4723 17.4805 21.4245 15.6983 21.807 13.758C20.1625 14.4385 18.3533 14.6164 16.6077 14.2692C14.8622 13.9219 13.2588 13.0651 12 11.807V11.807Z" />
          </svg>
        ) : (
          <svg className="sun-icon" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" />
            <path d="M12 1V3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 21V23" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.22 4.22L5.64 5.64" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.36 18.36L19.78 19.78" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 12H3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H23" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.22 19.78L5.64 18.36" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.36 5.64L19.78 4.22" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeSwitcher;