import React from 'react';

/**
 * Card Component
 * 
 * A versatile card component for displaying content in a contained, styled box.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card style variant (default, primary, secondary, etc.)
 * @param {boolean} [props.hoverable=false] - Whether the card should have hover effects
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @param {React.ReactNode} [props.header] - Card header content
 * @param {React.ReactNode} [props.footer] - Card footer content
 * @param {Function} [props.onClick] - Click handler function
 */
const Card = ({
  variant = 'default',
  hoverable = false,
  className = '',
  children,
  header,
  footer,
  onClick,
  ...rest
}) => {
  // Construct class names based on props
  const baseClass = 'card';
  const variantClass = variant !== 'default' ? `card-${variant}` : '';
  const hoverableClass = hoverable ? 'card-hoverable' : '';
  const clickableClass = onClick ? 'card-clickable' : '';
  
  const cardClasses = [
    baseClass,
    variantClass,
    hoverableClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...rest}
    >
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;