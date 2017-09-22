import React from 'react';
import './Button.css';

const Hint = function ({ children }) {
  return (
    <span className='wk-button__hint'>
      { children }
    </span>
  );
};

const Button = function ({ adjust = 'auto', children, className, disabled, id, onClick, type }) {
  let componentClasses = `wk-button`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  if (type) {
    componentClasses += ` wk-button--type-${type}`;
  }

  if (adjust) {
    componentClasses += ` wk-button--adjust-${adjust}`;
  }

  return (
    <button id={ id } className={ componentClasses } disabled={ disabled } onClick={ onClick }>
      { children }
    </button>
  );
};

Button.Hint = Hint;

export default Button;
