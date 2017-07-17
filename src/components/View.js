import React from 'react';
import './View.css';

const View = function (props) {
  let className = `wk-view wk-view--orientation-${props.orientation}`;

  if (props.size) {
    className += ` wk-view--size-${props.size}`;
  }

  if (props.alignItems) {
    className += ` wk-view--align-items-${props.alignItems}`;
  }

  if (props.justifyContent) {
    className += ` wk-view--justify-content-${props.justifyContent}`;
  }

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

export default View;
