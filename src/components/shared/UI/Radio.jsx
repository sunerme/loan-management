import React from 'react';

/**
 * Radio Component
 * 
 * A customizable radio input component.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Radio name attribute
 * @param {string} [props.id] - Radio id attribute
 * @param {string} props.value - Radio value attribute
 * @param {string} [props.label] - Radio label text
 * @param {string|number} [props.checkedValue] - Currently selected value in the radio group
 * @param {Function} [props.onChange] - Change handler function
 * @param {boolean} [props.required=false] - Whether the radio is required
 * @param {boolean} [props.disabled=false] - Whether the radio is disabled
 * @param {string} [props.className] - Additional CSS classes for the radio wrapper
 * @param {string} [props.radioClassName] - Additional CSS classes for the radio input
 * @param {string} [props.labelClassName] - Additional CSS classes for the label
 */
const Radio = ({
  name,
  id = `${name}-${value}`,
  value,
  label,
  checkedValue,
  onChange,
  required = false,
  disabled = false,
  className = '',
  radioClassName = '',
  labelClassName = '',
  ...rest
}) => {
  // Determine if this radio is checked
  const isChecked = checkedValue === value;
  
  // Construct class names based on props
  const wrapperClasses = [
    'form-check',
    'form-check-radio',
    className
  ].filter(Boolean).join(' ');
  
  const radioClasses = [
    'form-check-input',
    radioClassName
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'form-check-label',
    required ? 'required' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={radioClasses}
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...rest}
      />
      
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
};

/**
 * RadioGroup Component
 * 
 * A group of radio buttons with a shared name.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Radio group name attribute
 * @param {string} [props.label] - Group label text
 * @param {Array} props.options - Array of options for the radio group
 * @param {string|number} [props.value] - Currently selected value
 * @param {Function} [props.onChange] - Change handler function
 * @param {boolean} [props.required=false] - Whether selection is required
 * @param {boolean} [props.disabled=false] - Whether the entire group is disabled
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helperText] - Helper text to display below the group
 * @param {string} [props.className] - Additional CSS classes for the group wrapper
 * @param {string} [props.labelClassName] - Additional CSS classes for the group label
 * @param {boolean} [props.inline=false] - Whether to display radios inline
 */
export const RadioGroup = ({
  name,
  label,
  options = [],
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helperText,
  className = '',
  labelClassName = '',
  inline = false,
  ...rest
}) => {
  // Construct class names based on props
  const wrapperClasses = [
    'form-group',
    error ? 'has-error' : '',
    className
  ].filter(Boolean).join(' ');
  
  const groupClasses = [
    'radio-group',
    inline ? 'radio-group-inline' : '',
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'form-label',
    required ? 'required' : '',
    labelClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={groupClasses}>
        {options.map((option) => {
          // Handle different option formats
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          const optionDisabled = typeof option === 'object' ? option.disabled : false;
          
          return (
            <Radio
              key={optionValue}
              name={name}
              value={optionValue}
              label={optionLabel}
              checkedValue={value}
              onChange={onChange}
              disabled={disabled || optionDisabled}
              required={required}
              className={inline ? 'form-check-inline' : ''}
              {...rest}
            />
          );
        })}
      </div>
      
      {error && <div className="invalid-feedback d-block">{error}</div>}
      
      {helperText && !error && (
        <div className="form-text">{helperText}</div>
      )}
    </div>
  );
};

export default Radio;