import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout Component
 * 
 * The main layout wrapper for the loan management system.
 * Includes header, main content area, and footer.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered in the main area
 * @param {boolean} [props.isLoggedIn=false] - Whether a user is logged in
 * @param {Object} [props.user=null] - Current user object
 * @param {Function} [props.onLogout] - Logout handler function
 * @param {boolean} [props.hideFooter=false] - Whether to hide the footer
 * @param {string} [props.className] - Additional CSS classes for the main content
 */
const Layout = ({
  children,
  isLoggedIn = false,
  user = null,
  onLogout,
  hideFooter = false,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className="layout">
      <Header 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <main className={`main ${className}`}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;