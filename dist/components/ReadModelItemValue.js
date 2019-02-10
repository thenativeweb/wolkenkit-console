import _typeof from "@babel/runtime/helpers/typeof";
import CopyPasteValue from './CopyPasteValue';
import { Icon } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';

var styles = function styles(theme) {
  return {
    ValueContainer: {
      display: 'flex',
      color: theme.color.brand.white,
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      cursor: 'pointer',
      opacity: 0.8
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
      opacity: 0,
      marginTop: '-0.1em'
    }
  };
};

var ReadModelItemValue = React.memo(function (_ref) {
  var classes = _ref.classes,
      value = _ref.value,
      onJsonClick = _ref.onJsonClick;

  if (value === null) {
    return 'null';
  }

  var valueType = _typeof(value);

  switch (valueType) {
    case 'object':
      return React.createElement("div", {
        className: classes.ValueContainer,
        onClick: function onClick(event) {
          return onJsonClick(value, event);
        },
        title: "View details",
        "aria-label": "View details"
      }, React.createElement("div", {
        className: classes.Value
      }, JSON.stringify(value)), React.createElement(Icon, {
        size: "s",
        name: "expand-in-modal",
        className: classes.CopyIcon
      }));

    default:
      return React.createElement(CopyPasteValue, {
        className: classes.ValueContainer,
        value: value
      });
  }
});
export default injectSheet(styles)(observer(ReadModelItemValue));