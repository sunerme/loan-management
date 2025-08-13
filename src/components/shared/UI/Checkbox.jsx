import React from 'react';

/**
 * Checkbox Component
 * 
 * A customizable checkbox input component.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Checkbox name attribute
 * @param {string} [props.id] - Checkbox id attribute
 * @param {string} [props.label] - Checkbox label text
 * @param {boolean} [props.checked=false] - Whether the checkbox is checked
 * @param {Function} [props.onChange] - Change handler function
 * @param {boolean} [props.required=false] - Whether the checkbox is required
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display below the checkbox
 * @param {string} [props.className] - Additional CSS classes for the checkbox wrapper
 * @param {string} [props.checkboxClassName] - Additional CSS classes for the checkbox input
 * @param {string} [props.labelClassName] - Additional CSS classes for the label
 */
const Checkbox = ({
  name,
  id = name,
  label,
  checked = false,
  onChange,
  required = false,
  disabled = false,
  error,
  helperText,
  className = '',
  checkboxClassName = '',
  labelClassName = '',
  ...rest
}) => {
  // Construct class names based on props
  const wrapperClasses = [
    'form-check',
    error ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ');
  
  const checkboxClasses = [
    'form-check-input',
    error ? 'is-invalid' : '',
    checkboxClassName
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'form-check-label',
    required ? 'required' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses}>
      <input
        type="checkbox"
        id={id}
        name={name}
        className={checkboxClasses}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText ? `${id}-helper-text` : undefined}
        {...rest}
      />
      
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      
      {error && <div className="invalid-feedback">{error}</div>}
      
      {helperText && !error && (
        <div id={`${id}-helper-text`} className="form-text">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Checkbox;