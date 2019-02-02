import { Icon } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import ReadModelItemValue from './ReadModelItemValue';

const styles = theme => ({
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
});

const ReadModelItem = function ({ classes, item, onJsonClick, style }) {
  /* eslint-disable no-extra-parens */
  return (
    <div className={ classes.ReadModelItem } style={ style }>
      { Object.keys(item).
        filter(key => key !== 'isAuthorized').
        map(itemKey => (
          <div className={ classes.Field } key={ itemKey }>
            <div className={ classes.Key }>{ itemKey }</div>
            <ReadModelItemValue
              value={ item[itemKey] }
              onJsonClick={ onJsonClick }
            />
          </div>
        ))
      }
      <div
        className={ classes.Expand }
        onClick={ () => onJsonClick(item) }
      >
        <Icon
          size='s'
          name='expand-in-modal'
          className={ classes.ExpandIcon }
        />
      </div>
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(ReadModelItem));
