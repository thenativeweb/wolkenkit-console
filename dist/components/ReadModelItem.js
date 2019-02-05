import { Icon } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import ReadModelItemValue from './ReadModelItemValue';

var styles = function styles(theme) {
  return {
    ReadModelItem: {
      display: 'flex',
      flexDirection: 'row',
      padding: theme.grid.stepSize * 1.5,
      'border-bottom': '1px solid #444',
      color: '#666',
      boxSizing: 'border-box',
      transition: 'background 200ms ease-in-out',
      willChange: 'background',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.1)',
        '& $ExpandIcon': {
          opacity: 1
        }
      }
    },
    Field: {
      'flex-grow': 1,
      'flex-shrink': 1,
      flexBasis: '120px',
      overflow: 'hidden',
      'padding-left': theme.grid.stepSize * 1.5
    },
    Key: {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'padding-bottom': theme.grid.stepSize * 0.5
    },
    ValueContainer: {
      display: 'flex',
      color: theme.color.brand.white,
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      cursor: 'pointer',
      opacity: 0.8,
      '&:hover': {
        opacity: 1,
        '& $CopyIcon': {
          opacity: 1
        }
      }
    },
    Value: {
      'flex-basis': 'auto',
      color: theme.color.brand.white,
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'padding-right': theme.grid.stepSize
    },
    CopyIcon: {
      'flex-grow': 0,
      'flex-shrink': 0,
      'flex-basis': 'auto',
      fill: theme.color.brand.white,
      opacity: 0
    },
    Expand: {
      display: 'flex',
      alignItems: 'flex-end',
      paddingLeft: theme.grid.stepSize * 1.5,
      paddingBottom: 3,
      cursor: 'pointer'
    },
    ExpandIcon: {
      extend: 'CopyIcon'
    }
  };
};

var ReadModelItem = function ReadModelItem(_ref) {
  var classes = _ref.classes,
      item = _ref.item,
      onJsonClick = _ref.onJsonClick,
      style = _ref.style;
  return React.createElement("div", {
    className: classes.ReadModelItem,
    style: style
  }, Object.keys(item).filter(function (key) {
    return key !== 'isAuthorized';
  }).map(function (itemKey) {
    return React.createElement("div", {
      className: classes.Field,
      key: itemKey
    }, React.createElement("div", {
      className: classes.Key
    }, itemKey), React.createElement(ReadModelItemValue, {
      value: item[itemKey],
      onJsonClick: onJsonClick
    }));
  }), React.createElement("div", {
    className: classes.Expand,
    onClick: function onClick() {
      return onJsonClick(item);
    }
  }, React.createElement(Icon, {
    size: "s",
    name: "expand-in-modal",
    className: classes.ExpandIcon
  })));
};

export default injectSheet(styles)(observer(ReadModelItem));