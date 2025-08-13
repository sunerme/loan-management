import React from 'react';

/**
 * TextArea Component
 * 
 * A customizable textarea component for multi-line text input.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - TextArea name attribute
 * @param {string} [props.id] - TextArea id attribute
 * @param {string} [props.label] - TextArea label text
 * @param {string} [props.placeholder] - TextArea placeholder text
 * @param {string} [props.value] - TextArea value
 * @param {Function} [props.onChange] - Change handler function
 * @param {Function} [props.onBlur] - Blur handler function
 * @param {boolean} [props.required=false] - Whether the textarea is required
 * @param {boolean} [props.disabled=false] - Whether the textarea is disabled
 * @param {boolean} [props.readOnly=false] - Whether the textarea is read-only
 * @param {number} [props.rows=3] - Number of visible text lines
 * @param {number} [props.minLength] - Minimum length of input
 * @param {number} [props.maxLength] - Maximum length of input
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display below the textarea
 * @param {string} [props.className] - Additional CSS classes for the textarea wrapper
 * @param {string} [props.textareaClassName] - Additional CSS classes for the textarea element
 * @param {string} [props.labelClassName] - Additional CSS classes for the label
 * @param {boolean} [props.resizable=true] - Whether the textarea is resizable
 * @param {boolean} [props.showCharCount=false] - Whether to show character count
 */
const TextArea = ({
  name,
  id = name,
  label,
  placeholder,
  value = '',
  onChange,
  onBlur,
  required = false,
  disabled = false,
  readOnly = false,
  rows = 3,
  minLength,
  maxLength,
  error,
  helperText,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  resizable = true,
  showCharCount = false,
  ...rest
}) => {
  // Construct class names based on props
  const wrapperClasses = [
    'form-group',
    error ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ');
  
  const textareaClasses = [
    'form-control',
    error ? 'is-invalid' : '',
    !resizable ? 'resize-none' : '',
    textareaClassName
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'form-label',
    required ? 'required' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  // Calculate character count and limits
  const charCount = value ? value.length : 0;
  const showCount = showCharCount || maxLength;
  
  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      
      <textarea
        id={id}
        name={name}
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText || showCount ? `${id}-helper-text` : undefined}
        {...rest}
      />
      
      {error && <div className="invalid-feedback">{error}</div>}
      
      <div className="form-text-wrapper">
        {helperText && !error && (
          <div id={`${id}-helper-text`} className="form-text">
            {helperText}
          </div>
        )}
        
        {showCount && (
          <div className="char-count">
            {charCount}{maxLength ? `/${maxLength}` : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;