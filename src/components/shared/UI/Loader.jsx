import React from 'react';

/**
 * Loader Component
 * 
 * A versatile loading indicator component with various styles and sizes.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='spinner'] - Loader type (spinner, dots, pulse, skeleton)
 * @param {string} [props.size='md'] - Loader size (sm, md, lg)
 * @param {string} [props.color='primary'] - Loader color (primary, secondary, etc.)
 * @param {string} [props.text] - Text to display with the loader
 * @param {boolean} [props.fullScreen=false] - Whether to display the loader full screen
 * @param {boolean} [props.overlay=false] - Whether to display an overlay behind the loader
 * @param {string} [props.className] - Additional CSS classes
 */
const Loader = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  overlay = false,
  className = '',
  ...rest
}) => {
  // Construct class names based on props
  const wrapperClasses = [
    'loader-wrapper',
    fullScreen ? 'loader-fullscreen' : '',
    overlay ? 'loader-overlay' : '',
    className
  ].filter(Boolean).join(' ');
  
  const loaderClasses = [
    'loader',
    `loader-${type}`,
    `loader-${size}`,
    `text-${color}`
  ].filter(Boolean).join(' ');
  
  // Render different loader types
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={loaderClasses}>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
          </div>
        );
      case 'pulse':
        return (
          <div className={loaderClasses}>
            <div className="loader-pulse"></div>
          </div>
        );
      case 'skeleton':
        return (
          <div className={loaderClasses}>
            <div className="loader-skeleton"></div>
          </div>
        );
      case 'spinner':
      default:
        return (
          <div className={loaderClasses}>
            <div className="loader-spinner"></div>
          </div>
        );
    }
  };
  
  return (
    <div className={wrapperClasses} {...rest}>
      {renderLoader()}
      {text && <div className="loader-text">{text}</div>}
    </div>
  );
};

/**
 * ContentLoader Component
 * 
 * A component that shows a loader while content is loading.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.loading - Whether content is loading
 * @param {React.ReactNode} props.children - Content to display when not loading
 * @param {React.ReactNode} [props.fallback] - Custom fallback component to show while loading
 * @param {string} [props.loaderType='spinner'] - Type of loader to display
 * @param {string} [props.loaderSize='md'] - Size of loader
 * @param {string} [props.loaderText] - Text to display with the loader
 * @param {string} [props.className] - Additional CSS classes
 */
export const ContentLoader = ({
  loading,
  children,
  fallback,
  loaderType = 'spinner',
  loaderSize = 'md',
  loaderText,
  className = '',
  ...rest
}) => {
  if (!loading) {
    return children;
  }
  
  if (fallback) {
    return fallback;
  }
  
  return (
    <div className={`content-loader ${className}`} {...rest}>
      <Loader 
        type={loaderType} 
        size={loaderSize} 
        text={loaderText} 
      />
    </div>
  );
};

/**
 * SkeletonLoader Component
 * 
 * A component that renders skeleton placeholders for content.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Skeleton type (text, circle, rectangle)
 * @param {number} [props.lines=1] - Number of lines for text skeleton
 * @param {string} [props.width] - Width of the skeleton
 * @param {string} [props.height] - Height of the skeleton
 * @param {string} [props.className] - Additional CSS classes
 */
export const SkeletonLoader = ({
  type = 'text',
  lines = 1,
  width,
  height,
  className = '',
  ...rest
}) => {
  const skeletonClasses = [
    'skeleton',
    `skeleton-${type}`,
    className
  ].filter(Boolean).join(' ');
  
  const style = {
    width,
    height
  };
  
  if (type === 'text' && lines > 1) {
    return (
      <div className="skeleton-group" {...rest}>
        {Array.from({ length: lines }).map((_, index) => (
          <div 
            key={index} 
            className={skeletonClasses} 
            style={{
              ...style,
              width: index === lines - 1 && lines > 1 ? '75%' : width
            }}
          />
        ))}
      </div>
    );
  }
  
  return <div className={skeletonClasses} style={style} {...rest} />;
};

export default Loader;