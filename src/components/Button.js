import React from 'react';
import './Button.css';

const Hint = function (props) {
  return (
    <span className='wk-button__hint'>
      { props.children }
    </span>
  );
};

const Button = function (props) {
  let className = `wk-button ${props.className}`;

  if (props.type) {
    className += ` wk-button--type-${props.type}`;
  }

  if (props.size) {
    className += ` wk-button--size-${props.size}`;
  }

  return (
    <button id={ props.id } className={ className } onClick={ props.onClick }>
      { props.children }
    </button>
  );
};

Button.Hint = Hint;

export default Button;
