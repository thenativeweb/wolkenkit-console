import injectSheet from 'react-jss';
import React from 'react';

var styles = function styles(theme) {
  return {
    ListItem: {
      boxSizing: 'border-box',
      overflow: 'hidden',
      'border-bottom': "1px solid ".concat(theme.color.brand.midGrey),
      transition: 'background 200ms ease-in-out',
      willChange: 'background',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.1)'
      }
    }
  };
};

var ListItem = React.memo(function (_ref) {
  var classes = _ref.classes,
      children = _ref.children,
      style = _ref.style;
  return React.createElement("div", {
    className: classes.ListItem,
    style: style
  }, children);
});
export default injectSheet(styles)(ListItem);