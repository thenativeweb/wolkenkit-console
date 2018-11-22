import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import { services } from 'thenativeweb-ux';

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

  Value: {
    color: theme.color.brand.white,
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap'
  }
});

const handleValueClicked = function (event) {
  const text = event.target.innerText;

  services.notifications.show({ type: 'success', text: `Copied ${text} to clipboard!` });

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
            <div className={ classes.Value } onClick={ handleValueClicked }>{ JSON.stringify(item[itemKey]) }</div>
          </div>
        ))
      }
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(ReadModelItem));
