import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import Layout from './components/shared/Layout/Layout';
import DashboardLayout from './components/shared/Layout/DashboardLayout';

// Sample Pages (placeholders)
const Home = () => <div className="container py-5"><h1>Home Page</h1><p>Welcome to the Loan Management System</p></div>;
const About = () => <div className="container py-5"><h1>About Us</h1><p>Learn about our loan services</p></div>;
const Login = () => <div className="container py-5"><h1>Login</h1><p>Login form will be here</p></div>;
const Register = () => <div className="container py-5"><h1>Register</h1><p>Registration form will be here</p></div>;
const Dashboard = () => <div className="container py-5"><h1>Dashboard</h1><p>User dashboard content</p></div>;
const Profile = () => <div className="container py-5"><h1>My Profile</h1><p>User profile information</p></div>;
const MyLoans = () => <div className="container py-5"><h1>My Loans</h1><p>User loans will be displayed here</p></div>;

/**
 * App Component
 * 
 * Main application component with routing and theme provider.
 */
const App = () => {
  // Mock authentication state (would come from auth context in a real app)
  const isAuthenticated = false;
  const user = null;
  
  // Mock logout function
  const handleLogout = () => {
    console.log('User logged out');
    // In a real app, this would clear auth state
  };
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };
  
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public routes with standard layout */}
          <Route 
            path="/" 
            element={
              <Layout isLoggedIn={isAuthenticated} user={user} onLogout={handleLogout}>
                <Home />
              </Layout>
            } 
          />
          <Route 
            path="/about" 
            element={
              <Layout isLoggedIn={isAuthenticated} user={user} onLogout={handleLogout}>
                <About />
              </Layout>
            } 
          />
          <Route 
            path="/login" 
            element={
              <Layout isLoggedIn={isAuthenticated} user={user} onLogout={handleLogout}>
                <Login />
              </Layout>
            } 
          />
          <Route 
            path="/register" 
            element={
              <Layout isLoggedIn={isAuthenticated} user={user} onLogout={handleLogout}>
                <Register />
              </Layout>
            } 
          />
          
          {/* Protected routes with dashboard layout */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout user={user} userRole="customer" onLogout={handleLogout}>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <DashboardLayout user={user} userRole="customer" onLogout={handleLogout}>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-loans" 
            element={
              <ProtectedRoute>
                <DashboardLayout user={user} userRole="customer" onLogout={handleLogout}>
                  <MyLoans />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route 
            path="*" 
            element={
              <Layout isLoggedIn={isAuthenticated} user={user} onLogout={handleLogout}>
                <div className="container py-5">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              </Layout>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;