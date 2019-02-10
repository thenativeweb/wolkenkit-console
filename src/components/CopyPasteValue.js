import classNames from 'classnames';
import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import React from 'react';
import { Icon, services } from 'thenativeweb-ux';

const styles = theme => ({
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
});

const handleValueClicked = function (event) {
  const target = event.target;

  if (target) {
    let textToCopy = target.innerText;

    try {
      textToCopy = JSON.parse(textToCopy);
    } catch (ex) {
      return;
    }

    const hasBeenCopied = copy(String(textToCopy));

    if (hasBeenCopied) {
      services.notifications.show({ type: 'success', text: `Copied to clipboard!` });
    }
  }
};

const CopyPasteValue = React.memo(({ classes, className, value, stringify = true }) => (
  <span
    className={ classNames(classes.CopyPasteValue, className) }
    onClick={ handleValueClicked }
  >
    { stringify ? JSON.stringify(value) : value }
    <Icon className={ classes.CopyIcon } size='s' name='copy' />
  </span>
));

export default injectSheet(styles)(CopyPasteValue);
