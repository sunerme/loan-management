import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * 
 * The main footer for the loan management system.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`footer ${className}`}>
      <div className="container">
        <div className="footer-inner">
          {/* Footer Top */}
          <div className="footer-top">
            <div className="footer-logo">
              <Link to="/" className="footer-logo-link">
                <img src="/logo.svg" alt="Loan Management System" className="footer-logo-img" />
                <span className="footer-logo-text">LoanEase</span>
              </Link>
              <p className="footer-about">
                Simplifying loan management for businesses and individuals. Our platform provides
                easy-to-use tools for loan application, approval, and repayment tracking.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-links-column">
                <h3 className="footer-links-title">Company</h3>
                <ul className="footer-links-list">
                  <li className="footer-links-item">
                    <Link to="/about" className="footer-link">About Us</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/team" className="footer-link">Our Team</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/careers" className="footer-link">Careers</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/contact" className="footer-link">Contact Us</Link>
                  </li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3 className="footer-links-title">Services</h3>
                <ul className="footer-links-list">
                  <li className="footer-links-item">
                    <Link to="/personal-loans" className="footer-link">Personal Loans</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/business-loans" className="footer-link">Business Loans</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/mortgage" className="footer-link">Mortgage</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/refinancing" className="footer-link">Refinancing</Link>
                  </li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3 className="footer-links-title">Resources</h3>
                <ul className="footer-links-list">
                  <li className="footer-links-item">
                    <Link to="/blog" className="footer-link">Blog</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/faq" className="footer-link">FAQ</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/guides" className="footer-link">Guides</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/calculators" className="footer-link">Loan Calculators</Link>
                  </li>
                </ul>
              </div>
              
              <div className="footer-links-column">
                <h3 className="footer-links-title">Legal</h3>
                <ul className="footer-links-list">
                  <li className="footer-links-item">
                    <Link to="/terms" className="footer-link">Terms of Service</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/security" className="footer-link">Security</Link>
                  </li>
                  <li className="footer-links-item">
                    <Link to="/compliance" className="footer-link">Compliance</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; {currentYear} LoanEase. All rights reserved.
            </div>
            
            <div className="footer-social">
              <a href="https://facebook.com" className="footer-social-link" aria-label="Facebook">
                <i className="footer-social-icon facebook"></i>
              </a>
              <a href="https://twitter.com" className="footer-social-link" aria-label="Twitter">
                <i className="footer-social-icon twitter"></i>
              </a>
              <a href="https://linkedin.com" className="footer-social-link" aria-label="LinkedIn">
                <i className="footer-social-icon linkedin"></i>
              </a>
              <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram">
                <i className="footer-social-icon instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;