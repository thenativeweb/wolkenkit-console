import React from 'react';
import './CheckBox.css';

const CheckBox = function ({ className, id, name, value, onChange, size, type }) {
  let componentClasses = `wk-check-box`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  if (type) {
    componentClasses += ` wk-check-box--type-${type}`;
  }

  if (size) {
    componentClasses += ` wk-check-box--size-${size}`;
  }

  return (
    <input
      id={ id }
      className={ componentClasses }
      name={ name }
      type='checkbox'
      value={ value }
      onChange={ onChange }
    />
  );
};

export default CheckBox;
