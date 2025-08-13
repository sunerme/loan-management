import React from 'react';

/**
 * Input Component
 * 
 * A versatile input component that supports various types and states.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.)
 * @param {string} props.name - Input name attribute
 * @param {string} [props.id] - Input id attribute
 * @param {string} [props.label] - Input label text
 * @param {string} [props.placeholder] - Input placeholder text
 * @param {string} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler function
 * @param {Function} [props.onBlur] - Blur handler function
 * @param {Function} [props.onFocus] - Focus handler function
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.readOnly=false] - Whether the input is read-only
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display below the input
 * @param {string} [props.className] - Additional CSS classes for the input wrapper
 * @param {string} [props.inputClassName] - Additional CSS classes for the input element
 * @param {string} [props.labelClassName] - Additional CSS classes for the label
 * @param {boolean} [props.floating=false] - Whether to use floating label style
 * @param {React.ReactNode} [props.prefix] - Content to display before the input
 * @param {React.ReactNode} [props.suffix] - Content to display after the input
 */
const Input = ({
  type = 'text',
  name,
  id = name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  className = '',
  inputClassName = '',
  labelClassName = '',
  floating = false,
  prefix,
  suffix,
  ...rest
}) => {
  // Construct class names based on props
  const wrapperClasses = [
    'form-group',
    floating ? 'form-floating' : '',
    error ? 'has-error' : '',
    prefix || suffix ? 'input-group' : '',
    className
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    'form-control',
    error ? 'is-invalid' : '',
    inputClassName
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'form-label',
    required ? 'required' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses}>
      {!floating && label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={prefix || suffix ? 'input-group-inner' : ''}>
        {prefix && <div className="input-group-prefix">{prefix}</div>}
        
        <input
          type={type}
          id={id}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText ? `${id}-helper-text` : undefined}
          {...rest}
        />
        
        {suffix && <div className="input-group-suffix">{suffix}</div>}
      </div>
      
      {floating && label && (
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

export default Input;