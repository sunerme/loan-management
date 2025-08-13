import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Sidebar Component
 * 
 * Navigation sidebar for the dashboard area of the loan management system.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.isCollapsed=false] - Whether the sidebar is collapsed
 * @param {Function} [props.toggleSidebar] - Function to toggle sidebar collapse state
 * @param {Object} [props.user=null] - Current user object
 * @param {string} [props.userRole='customer'] - User role (admin, manager, agent, customer)
 * @param {string} [props.className] - Additional CSS classes
 */
const Sidebar = ({
  isCollapsed = false,
  toggleSidebar,
  user = null,
  userRole = 'customer',
  className = '',
}) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState([]);
  
  // Toggle submenu expansion
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };
  
  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'dashboard',
        path: '/dashboard',
      },
      {
        id: 'profile',
        label: 'My Profile',
        icon: 'person',
        path: '/profile',
      },
    ];
    
    const customerItems = [
      {
        id: 'loans',
        label: 'My Loans',
        icon: 'money',
        path: '/my-loans',
      },
      {
        id: 'applications',
        label: 'Loan Applications',
        icon: 'description',
        path: '/applications',
      },
      {
        id: 'payments',
        label: 'Payments',
        icon: 'payment',
        path: '/payments',
      },
      {
        id: 'documents',
        label: 'Documents',
        icon: 'folder',
        path: '/documents',
      },
    ];
    
    const adminItems = [
      {
        id: 'admin-loans',
        label: 'Loan Management',
        icon: 'account_balance',
        path: '/admin/loans',
        children: [
          { id: 'all-loans', label: 'All Loans', path: '/admin/loans' },
          { id: 'pending-loans', label: 'Pending Approval', path: '/admin/loans/pending' },
          { id: 'approved-loans', label: 'Approved Loans', path: '/admin/loans/approved' },
          { id: 'rejected-loans', label: 'Rejected Loans', path: '/admin/loans/rejected' },
          { id: 'loan-types', label: 'Loan Types', path: '/admin/loan-types' },
        ],
      },
      {
        id: 'admin-users',
        label: 'User Management',
        icon: 'people',
        path: '/admin/users',
        children: [
          { id: 'all-users', label: 'All Users', path: '/admin/users' },
          { id: 'customers', label: 'Customers', path: '/admin/users/customers' },
          { id: 'staff', label: 'Staff Members', path: '/admin/users/staff' },
        ],
      },
      {
        id: 'admin-reports',
        label: 'Reports',
        icon: 'bar_chart',
        path: '/admin/reports',
        children: [
          { id: 'loan-reports', label: 'Loan Reports', path: '/admin/reports/loans' },
          { id: 'payment-reports', label: 'Payment Reports', path: '/admin/reports/payments' },
          { id: 'user-reports', label: 'User Reports', path: '/admin/reports/users' },
        ],
      },
      {
        id: 'admin-settings',
        label: 'Settings',
        icon: 'settings',
        path: '/admin/settings',
      },
    ];
    
    if (userRole === 'admin') {
      return [...commonItems, ...adminItems];
    }
    
    return [...commonItems, ...customerItems];
  };
  
  const navItems = getNavItems();
  
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''} ${className}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          {isCollapsed ? (
            <img src="/logo-icon.svg" alt="LoanEase" className="sidebar-logo-icon" />
          ) : (
            <>
              <img src="/logo.svg" alt="LoanEase" className="sidebar-logo-img" />
              <span className="sidebar-logo-text">LoanEase</span>
            </>
          )}
        </Link>
        
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <i className={`sidebar-toggle-icon ${isCollapsed ? 'expand' : 'collapse'}`}></i>
        </button>
      </div>
      
      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span>{user.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          
          {!isCollapsed && (
            <div className="sidebar-user-info">
              <h3 className="sidebar-user-name">{user.name}</h3>
              <p className="sidebar-user-role">{userRole}</p>
            </div>
          )}
        </div>
      )}
      
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.children ? (
                <>
                  <button 
                    className={`sidebar-nav-link has-submenu ${expandedMenus.includes(item.id) ? 'expanded' : ''}`}
                    onClick={() => toggleSubmenu(item.id)}
                  >
                    <i className={`sidebar-nav-icon ${item.icon}`}></i>
                    {!isCollapsed && (
                      <>
                        <span className="sidebar-nav-text">{item.label}</span>
                        <i className={`sidebar-submenu-arrow ${expandedMenus.includes(item.id) ? 'up' : 'down'}`}></i>
                      </>
                    )}
                  </button>
                  
                  {(expandedMenus.includes(item.id) || isCollapsed) && (
                    <ul className={`sidebar-submenu ${isCollapsed ? 'sidebar-submenu-floating' : ''}`}>
                      {item.children.map((subItem) => (
                        <li 
                          key={subItem.id} 
                          className={`sidebar-submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                        >
                          <Link to={subItem.path} className="sidebar-submenu-link">
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.path} className="sidebar-nav-link">
                  <i className={`sidebar-nav-icon ${item.icon}`}></i>
                  {!isCollapsed && <span className="sidebar-nav-text">{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="sidebar-footer-content">
            <p className="sidebar-footer-text">Need help?</p>
            <Link to="/support" className="sidebar-footer-link">Contact Support</Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;