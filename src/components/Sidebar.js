import React from 'react';
import './Sidebar.css';

const Sidebar = function (props) {
  return (
    <div className='wk-sidebar'>
      { props.children }
    </div>
  );
};

export default Sidebar;
