import Icon from './Icon';
import React from 'react';
import './ControlGroup.css';

const Divider = function () {
  return (
    <hr
      className='wk-control-group__divider'
    />
  );
};

const Item = function ({ className, adjust, children, helpLink, label, isVisible = true, type = 'text' }) {
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

  if (type === 'checkbox') {
    componentClasses += ' wk-control-group__item--checkbox';

    const controlId = children || children.props.id ? children.props.id : undefined;

    return (
      <div
        className={ componentClasses }
      >
        <div className='wk-control-group__item__label'>
          <div className='wk-control-group__item__control'>{ children }</div>
          { label ? <label htmlFor={ controlId }>{ label }</label> : null }
          { helpLink ? <a className='help' title='Get more detailed information…' rel='noopener noreferrer' target='_blank' href={ helpLink }><Icon name='help' /></a> : null }
        </div>
      </div>
    );
  }

  return (
    <div
      className={ componentClasses }
    >
      <div className='wk-control-group__item__label'>
        { label ? <label>{ label }</label> : null }
        { helpLink ? <a className='help' rel='noopener noreferrer' target='_blank' href={ helpLink }><Icon name='help' /></a> : null }
      </div>
      <div className='wk-control-group__item__control'>{ children }</div>
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
    return null;
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
