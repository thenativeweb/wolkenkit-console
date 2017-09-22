import React from 'react';
import './Icon.css';

const Icon = function (props) {
  const { size, name } = props;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={ `wk-icon wk-icon-${name} wk-icon--${size}` }>
      <use xlinkHref={ `#icon-${name}` } />
    </svg>
  );
};

Icon.defaultProps = {
  size: 'medium'
};

export default Icon;
