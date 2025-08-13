import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import ThemeSwitcher from '../UI/ThemeSwitcher';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * Header Component
 * 
 * The main navigation header for the loan management system.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.isLoggedIn=false] - Whether a user is logged in
 * @param {Object} [props.user=null] - Current user object
 * @param {Function} [props.onLogout] - Logout handler function
 * @param {boolean} [props.isMobileMenuOpen=false] - Whether mobile menu is open
 * @param {Function} [props.toggleMobileMenu] - Function to toggle mobile menu
 */
const Header = ({
  isLoggedIn = false,
  user = null,
  onLogout,
  isMobileMenuOpen = false,
  toggleMobileMenu,
  className = '',
}) => {
  const { toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  return (
    <header className={`header ${className}`}>
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" className="header-logo-link">
              <img src="/logo.svg" alt="Loan Management System" className="header-logo-img" />
              <span className="header-logo-text">LoanEase</span>
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`header-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          {/* Navigation */}
          <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="header-nav-list">
              <li className="header-nav-item">
                <Link to="/" className="header-nav-link">Home</Link>
              </li>
              <li className="header-nav-item">
                <Link to="/about" className="header-nav-link">About</Link>
              </li>
              <li className="header-nav-item">
                <Link to="/loans" className="header-nav-link">Loans</Link>
              </li>
              <li className="header-nav-item">
                <Link to="/contact" className="header-nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
          
          {/* User Actions */}
          <div className="header-actions">
            {isLoggedIn ? (
              <div className="header-user">
                <button 
                  className="header-user-toggle"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                >
                  <div className="header-user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{user?.name?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <span className="header-user-name">{user?.name || 'User'}</span>
                </button>
                
                {dropdownOpen && (
                  <div className="header-user-dropdown">
                    <ul className="header-dropdown-list">
                      <li className="header-dropdown-item">
                        <Link to="/dashboard" className="header-dropdown-link">
                          Dashboard
                        </Link>
                      </li>
                      <li className="header-dropdown-item">
                        <Link to="/profile" className="header-dropdown-link">
                          My Profile
                        </Link>
                      </li>
                      <li className="header-dropdown-item">
                        <Link to="/my-loans" className="header-dropdown-link">
                          My Loans
                        </Link>
                      </li>
                      <li className="header-dropdown-divider"></li>
                      <li className="header-dropdown-item">
                        <button 
                          className="header-dropdown-button"
                          onClick={onLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="header-auth">
                <ThemeSwitcher onThemeChange={toggleTheme} className="header-theme-switcher" />
                <Link to="/login">
                  <Button variant="light" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;