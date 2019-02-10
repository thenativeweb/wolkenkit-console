import CopyPasteValue from './CopyPasteValue';
import { Icon } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';

const styles = theme => ({
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
});

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
        <CopyPasteValue className={ classes.ValueContainer } value={ value } />
      );
  }
});

export default injectSheet(styles)(observer(ReadModelItemValue));
