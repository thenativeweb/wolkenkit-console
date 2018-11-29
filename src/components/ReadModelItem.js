import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import { Icon, services } from 'thenativeweb-ux';

const styles = theme => ({
  ReadModelItem: {
    display: 'flex',
    padding: theme.grid.stepSize,
    'border-bottom': '1px solid #444',
    color: '#666'
  },

  Field: {
    'flex-grow': 1,
    'flex-shrink': 1,
    'flex-basis': '120px',
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
  }
});

const handleValueClicked = function (event) {
  const text = event.currentTarget.innerText;

  services.notifications.show({ type: 'success', text: `Copied to clipboard!` });

  copy(JSON.parse(text));
};

const ReadModelItem = function ({ classes, item }) {
  /* eslint-disable no-extra-parens */
  return (
    <div className={ classes.ReadModelItem }>
      { Object.keys(item).
        filter(key => key !== 'isAuthorized').
        map(itemKey => (
          <div className={ classes.Field } key={ itemKey }>
            <div className={ classes.Key }>{ itemKey }</div>
            <div
              className={ classes.ValueContainer }
              onClick={ handleValueClicked }
              title='Copy to clipboard'
              aria-label='Copy to clipboard'
            >
              <div className={ classes.Value }>
                { JSON.stringify(item[itemKey]) }
              </div>
              <Icon
                size='s'
                name='copy'
                className={ classes.CopyIcon }
              />
            </div>
          </div>
        ))
      }
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(ReadModelItem));
