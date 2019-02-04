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
    const stringifiedJSON = target.innerText;

    copy(JSON.parse(stringifiedJSON));
    services.notifications.show({ type: 'success', text: `Copied to clipboard!` });
  }
};

const CopyPasteValue = React.memo(({ classes, value }) => (
  <span
    className={ classes.CopyPasteValue }
    onClick={ handleValueClicked }
  >
    { value }
    <Icon className={ classes.CopyIcon } size='s' name='copy' />
  </span>
));

export default injectSheet(styles)(CopyPasteValue);
