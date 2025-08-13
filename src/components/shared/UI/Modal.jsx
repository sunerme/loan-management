import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

/**
 * Modal Component
 * 
 * A customizable modal dialog component.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {string} [props.title] - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} [props.footer] - Modal footer content
 * @param {string} [props.size='md'] - Modal size (sm, md, lg, xl, fullscreen)
 * @param {boolean} [props.centered=false] - Whether to center the modal vertically
 * @param {boolean} [props.scrollable=false] - Whether the modal body is scrollable
 * @param {boolean} [props.closeOnEsc=true] - Whether to close the modal when Escape key is pressed
 * @param {boolean} [props.closeOnBackdropClick=true] - Whether to close the modal when backdrop is clicked
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button in the header
 * @param {string} [props.className] - Additional CSS classes for the modal
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = false,
  scrollable = false,
  closeOnEsc = true,
  closeOnBackdropClick = true,
  showCloseButton = true,
  className = '',
  ...rest
}) => {
  const modalRef = useRef(null);
  
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (isOpen) {
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen, onClose, closeOnEsc]);
  
  // Handle backdrop click
  const handleBackdropClick = (event) => {
    if (closeOnBackdropClick && event.target === modalRef.current) {
      onClose();
    }
  };
  
  // Construct class names based on props
  const modalClasses = [
    'modal',
    isOpen ? 'show' : '',
    className
  ].filter(Boolean).join(' ');
  
  const dialogClasses = [
    'modal-dialog',
    size ? `modal-${size}` : '',
    centered ? 'modal-dialog-centered' : '',
    scrollable ? 'modal-dialog-scrollable' : ''
  ].filter(Boolean).join(' ');
  
  // Don't render if not open
  if (!isOpen) return null;
  
  // Create portal for the modal
  return ReactDOM.createPortal(
    <div 
      className={modalClasses} 
      tabIndex="-1" 
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      onClick={handleBackdropClick}
      style={{ display: 'block' }}
      {...rest}
    >
      <div className={dialogClasses} role="document">
        <div className="modal-content">
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && <h5 className="modal-title">{title}</h5>}
              {showCloseButton && (
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              )}
            </div>
          )}
          
          <div className="modal-body">{children}</div>
          
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * ConfirmModal Component
 * 
 * A specialized modal for confirmation dialogs.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {Function} props.onConfirm - Function to call when the action is confirmed
 * @param {string} [props.title='Confirm Action'] - Modal title
 * @param {React.ReactNode} [props.children='Are you sure you want to proceed?'] - Modal content
 * @param {string} [props.confirmText='Confirm'] - Text for the confirm button
 * @param {string} [props.cancelText='Cancel'] - Text for the cancel button
 * @param {string} [props.confirmVariant='primary'] - Variant for the confirm button
 * @param {string} [props.size='sm'] - Modal size
 * @param {boolean} [props.confirmLoading=false] - Whether the confirm button is in loading state
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  children = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  size = 'sm',
  confirmLoading = false,
  ...rest
}) => {
  const handleConfirm = () => {
    onConfirm();
    if (!confirmLoading) {
      onClose();
    }
  };
  
  const footer = (
    <>
      <Button 
        variant="light" 
        onClick={onClose}
        disabled={confirmLoading}
      >
        {cancelText}
      </Button>
      <Button 
        variant={confirmVariant} 
        onClick={handleConfirm}
        loading={confirmLoading}
      >
        {confirmText}
      </Button>
    </>
  );
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size={size}
      closeOnEsc={!confirmLoading}
      closeOnBackdropClick={!confirmLoading}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default Modal;