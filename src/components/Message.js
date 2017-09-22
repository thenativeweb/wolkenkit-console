import React from 'react';
import './Message.css';

const Message = function ({ message, type = 'error' }) {
  if (!message) {
    return null;
  }

  return (
    <div className={ `wk-message wk-message--${type}` }>
      { message }
    </div>
  );
};

export default Message;
