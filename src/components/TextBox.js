import React from 'react';
import './TextBox.css';

const TextBox = function ({ className, id, name, value, onChange, placeholder, size, type }) {
  let componentClasses = `wk-text-box`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  if (type) {
    componentClasses += ` wk-text-box--type-${type}`;
  }

  if (size) {
    componentClasses += ` wk-text-box--size-${size}`;
  }

  return (
    <input
      id={ id }
      className={ componentClasses }
      name={ name }
      value={ value }
      onChange={ onChange }
      placeholder={ placeholder }
    />
  );
};

export default TextBox;
