import React from 'react';
import './ControlGroup.css';

const Divider = function () {
  return (
    <hr
      className='wk-control-group__divider'
    />
  );
};

const Item = function ({ className, adjust, children, label, isVisible = true }) {
  let componentClasses = `wk-control-group__item`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  if (adjust) {
    componentClasses += ` wk-control-group__item--adjust-${adjust}`;
  }

  if (!isVisible) {
    componentClasses += ' wk-control-group__item--hidden';
  }

  if (label) {
    componentClasses += ' wk-control-group__item--labeled';
  }

  return (
    <div
      className={ componentClasses }
    >
      { label ? <label>{ label }</label> : null }
      { children }
    </div>
  );
};

const ControlGroup = function ({ className, children, isVisible = true, type }) {
  let componentClasses = `wk-control-group`;

  if (className) {
    componentClasses += ` ${className}`;
  }

  if (type) {
    componentClasses += ` wk-control-group--${type}`;
  }

  if (!isVisible) {
    componentClasses += ' wk-control-group--hidden';
  }

  return (
    <div
      className={ componentClasses }
      children={ children }
    />
  );
};

ControlGroup.Divider = Divider;
ControlGroup.Item = Item;

export default ControlGroup;
