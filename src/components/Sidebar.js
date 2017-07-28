import React from 'react';
import './Sidebar.css';

const Item = function (props) {
  return (
    <div className={ `wk-sidebar__item wk-sidebar__item--${props.type}` }>
      { props.children }
    </div>
  );
};

const Sidebar = function (props) {
  return (
    <div className='wk-sidebar'>
      { props.children }
    </div>
  );
};

Sidebar.Item = Item;

export default Sidebar;
