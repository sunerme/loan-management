import React from 'react';

/**
 * Select Component
 * 
 * A customizable select dropdown component.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Select name attribute
 * @param {string} [props.id] - Select id attribute
 * @param {string} [props.label] - Select label text
 * @param {Array} props.options - Array of options for the select
 * @param {string|number} [props.value] - Selected value
 * @param {Function} [props.onChange] - Change handler function
 * @param {Function} [props.onBlur] - Blur handler function
 * @param {boolean} [props.required=false] - Whether the select is required
 * @param {boolean} [props.disabled=false] - Whether the select is disabled
 * @param {string} [props.placeholder='Select an option'] - Placeholder text
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display below the select
 * @param {string} [props.className] - Additional CSS classes for the select wrapper
 * @param {string} [props.selectClassName] - Additional CSS classes for the select element
 * @param {string} [props.labelClassName] - Additional CSS classes for the label
 * @param {boolean} [props.multiple=false] - Whether multiple options can be selected
 */
const Select = ({
  name,
  id = name,
  label,
  options = [],
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  error,
  helperText,
  className = '',
  selectClassName = '',
  labelClassName = '',
  multiple = false,
  ...rest
}) => {
  // Construct class names based on props
  const wrapperClasses = [
    'form-group',
    error ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ');
  
  const selectClasses = [
    'form-select',
    error ? 'is-invalid' : '',
    selectClassName
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'form-label',
    required ? 'required' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      
      <select
        id={id}
        name={name}
        className={selectClasses}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        multiple={multiple}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText ? `${id}-helper-text` : undefined}
        {...rest}
      >
        {placeholder && !multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => {
          // Handle different option formats
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          const optionDisabled = typeof option === 'object' ? option.disabled : false;
          
          return (
            <option 
              key={optionValue} 
              value={optionValue}
              disabled={optionDisabled}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
      
      {error && <div className="invalid-feedback">{error}</div>}
      
      {helperText && !error && (
        <div id={`${id}-helper-text`} className="form-text">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Select;