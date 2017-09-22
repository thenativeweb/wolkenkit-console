import React from 'react';
import './MessageBar.css';

const MessageBar = function (props) {
  if (!props.isVisble) {
    return null;
  }

  const className = `wk-message-bar wk-message-bar-${props.type || 'info'}`;

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

export default MessageBar;
