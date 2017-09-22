import React from 'react';
import './Form.css';

const Error = function ({ error }) {
  if (!error) {
    return null;
  }

  const className = `wk-form__error`;

  return (
    <div className={ className }>
      { error }
    </div>
  );
};

const Title = function ({ children, className }) {
  let componentClasses = `wk-form__title`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  return (
    <h2 className={ componentClasses }>
      { children }
    </h2>
  );
};

const Form = function ({ children, className, type, onSubmit }) {
  let componentClasses = `wk-form`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  if (type) {
    componentClasses += ` wk-form--type-${type}`;
  }

  if (onSubmit) {
    return (
      <form className={ componentClasses } onSubmit={ onSubmit }>
        { children }
      </form>
    );
  }

  return (
    <div className={ componentClasses }>
      { children }
    </div>
  );
};

Form.Error = Error;
Form.Title = Title;

export default Form;
