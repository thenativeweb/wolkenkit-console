import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import React from 'react';
import { Icon, services } from 'thenativeweb-ux';

var styles = function styles(theme) {
  return {
    CopyPasteValue: {
      cursor: 'pointer',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      '&:hover': {
        color: theme.color.brand.highlight,
        '& $CopyIcon': {
          opacity: 1
        }
      }
    },
    CopyIcon: {
      opacity: 0,
      'padding-left': theme.grid.stepSize,
      fill: theme.color.brand.highlight,
      'pointer-events': 'none'
    }
  };
};

var handleValueClicked = function handleValueClicked(event) {
  var target = event.target;

  if (target) {
    var stringifiedJSON = target.innerText;
    copy(JSON.parse(stringifiedJSON));
    services.notifications.show({
      type: 'success',
      text: "Copied to clipboard!"
    });
  }
};

var CopyPasteValue = React.memo(function (_ref) {
  var classes = _ref.classes,
      value = _ref.value;
  return React.createElement("span", {
    className: classes.CopyPasteValue,
    onClick: handleValueClicked
  }, value, React.createElement(Icon, {
    className: classes.CopyIcon,
    size: "s",
    name: "copy"
  }));
});
export default injectSheet(styles)(CopyPasteValue);