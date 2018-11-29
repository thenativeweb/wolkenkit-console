import _defineProperty from "@babel/runtime/helpers/defineProperty";
import classNames from 'classnames';
import injectSheet from 'react-jss';
import React from 'react';

var styles = function styles(theme) {
  return {
    EditorBar: {
      display: 'flex',
      'flex-grow': 0,
      'flex-shrink': 0,
      'border-bottom': '1px solid #eee',
      overflow: 'hidden',
      padding: theme.grid.stepSize,
      'align-items': 'center'
    },
    TypeBottom: {
      'border-bottom': 0,
      'border-top': '1px solid #eee'
    }
  };
};

var EditorBar = function EditorBar(_ref) {
  var children = _ref.children,
      classes = _ref.classes,
      className = _ref.className,
      style = _ref.style,
      type = _ref.type;
  var componentClasses = classNames(classes.EditorBar, _defineProperty({}, classes.TypeBottom, type === 'bottom'), className);
  return React.createElement("div", {
    className: componentClasses,
    style: style
  }, children);
};

export default injectSheet(styles)(EditorBar);