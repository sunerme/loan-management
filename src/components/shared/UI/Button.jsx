import React from 'react';

/**
 * Button Component
 * 
 * A versatile button component that supports various styles, sizes, and states.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, outline, text, danger)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button is in loading state
 * @param {string} [props.type='button'] - Button type attribute
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  children,
  ...rest
}) => {
  // Base button classes
  const baseClasses = 'btn';
  
  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    text: 'btn-text',
    danger: 'btn-danger',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };
  
  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth ? 'btn-full-width' : '',
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <>
          <span className="btn-spinner"></span>
          <span className="btn-text">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;