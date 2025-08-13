import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

/**
 * DashboardLayout Component
 * 
 * Layout component specifically for dashboard pages with sidebar navigation.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered in the main area
 * @param {Object} [props.user=null] - Current user object
 * @param {string} [props.userRole='customer'] - User role (admin, manager, agent, customer)
 * @param {Function} [props.onLogout] - Logout handler function
 * @param {boolean} [props.hideFooter=false] - Whether to hide the footer
 * @param {string} [props.className] - Additional CSS classes for the main content
 */
const DashboardLayout = ({
  children,
  user = null,
  userRole = 'customer',
  onLogout,
  hideFooter = false,
  className = '',
}) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Check window size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setIsMobileMenuOpen(false);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        user={user}
        userRole={userRole}
        className={isMobileView && isMobileMenuOpen ? 'mobile-visible' : ''}
      />
      
      <div className="dashboard-content">
        <Header 
          isLoggedIn={true}
          user={user}
          onLogout={onLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          className="dashboard-header"
        />
        
        <main className={`dashboard-main ${className}`}>
          {children}
        </main>
        
        {!hideFooter && <Footer className="dashboard-footer" />}
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isMobileView && isMobileMenuOpen && (
        <div 
          className="dashboard-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default DashboardLayout;