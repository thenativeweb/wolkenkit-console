import _typeof from "@babel/runtime/helpers/typeof";
import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import { Icon, services } from 'thenativeweb-ux';

var styles = function styles(theme) {
  return {
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
      opacity: 0,
      marginTop: '-0.1em'
    }
  };
};

var handleCopyClicked = function handleCopyClicked(event) {
  var text = event.currentTarget.innerText;
  services.notifications.show({
    type: 'success',
    text: "Copied to clipboard!"
  });
  copy(JSON.parse(text));
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
      return React.createElement("div", {
        className: classes.ValueContainer,
        onClick: handleCopyClicked,
        title: "Copy to clipboard",
        "aria-label": "Copy to clipboard"
      }, React.createElement("div", {
        className: classes.Value
      }, JSON.stringify(value)), React.createElement(Icon, {
        size: "s",
        name: "copy",
        className: classes.CopyIcon
      }));
  }
});
export default injectSheet(styles)(observer(ReadModelItemValue));