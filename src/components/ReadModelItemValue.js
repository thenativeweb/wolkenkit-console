import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import { Icon, services } from 'thenativeweb-ux';

const styles = theme => ({
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
});

const handleCopyClicked = function (event) {
  const text = event.currentTarget.innerText;

  services.notifications.show({ type: 'success', text: `Copied to clipboard!` });

  copy(JSON.parse(text));
};

const ReadModelItemValue = React.memo(({ classes, value, onJsonClick }) => {
  if (value === null) {
    return 'null';
  }

  const valueType = typeof value;

  switch (valueType) {
    case 'object':
      return (
        <div
          className={ classes.ValueContainer }
          onClick={ event => onJsonClick(value, event) }
          title='View details'
          aria-label='View details'
        >
          <div className={ classes.Value }>
            { JSON.stringify(value) }
          </div>
          <Icon
            size='s'
            name='expand-in-modal'
            className={ classes.CopyIcon }
          />
        </div>
      );
    default:
      return (
        <div
          className={ classes.ValueContainer }
          onClick={ handleCopyClicked }
          title='Copy to clipboard'
          aria-label='Copy to clipboard'
        >
          <div className={ classes.Value }>
            { JSON.stringify(value) }
          </div>
          <Icon
            size='s'
            name='copy'
            className={ classes.CopyIcon }
          />
        </div>
      );
  }
});

export default injectSheet(styles)(observer(ReadModelItemValue));
