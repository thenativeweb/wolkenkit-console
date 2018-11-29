import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import classNames from 'classnames';
import injectSheet from 'react-jss';
import React, { useState } from 'react';

var styles = function styles(theme) {
  return {
    Tabs: {
      display: 'flex',
      'flex-direction': 'column',
      background: theme.color.brand.dark,
      color: theme.color.brand.lightGrey,
      width: '100%',
      height: '100%'
    },
    Navigation: {
      display: 'flex',
      'flex-direction': 'row'
    },
    Tab: {
      'flex-grow': 1,
      'flex-basis': 'auto',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      padding: '20px',
      cursor: 'pointer',
      'border-bottom': '2px solid #444'
    },
    IsActive: {
      'border-bottom': "2px solid ".concat(theme.color.brand.highlight),
      color: theme.color.brand.highlight
    },
    ActiveTabContent: {
      'flex-grow': 1,
      'flex-basis': '100%',
      display: 'flex',
      overflow: 'auto'
    }
  };
};

var Tabs = function Tabs() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      className = _ref.className,
      classes = _ref.classes,
      children = _ref.children;

  var componentClasses = classNames(classes.Tabs, className);

  if (!children) {
    throw new Error('Tabs should contain at least one child.');
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeIndex = _useState2[0],
      setActiveIndex = _useState2[1];

  var handleTabClicked = function handleTabClicked(event) {
    var newIndex = Number(event.target.getAttribute('data-index'));
    setActiveIndex(newIndex);
  };
  /* eslint-disable react/jsx-no-bind */


  return React.createElement("div", {
    className: componentClasses
  }, React.createElement("div", {
    className: classes.Navigation
  },
  /* eslint-disable no-extra-parens */
  children.map(function (child, index) {
    return React.createElement("div", {
      key: index,
      className: classNames(classes.Tab, _defineProperty({}, classes.IsActive, activeIndex === index)),
      "data-index": index,
      onClick: handleTabClicked
    }, child.props.title);
  })
  /* eslint-enable no-extra-parens */
  ), React.createElement("div", {
    className: classes.ActiveTabContent
  }, children[activeIndex]))
  /* eslint-enable react/jsx-no-bind */
  ;
};

export default injectSheet(styles)(Tabs);