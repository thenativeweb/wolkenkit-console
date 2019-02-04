import classNames from 'classnames';
import format from 'date-fns/format';
import { Icon } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import JSONTree from './JSONTree';
import { observer } from 'mobx-react';
import pick from 'lodash/pick';
import React from 'react';

const styles = theme => ({
  Event: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: '#666',
    'white-space': 'pre',
    'line-height': 1.1,

    '&:hover $DetailsData': {
      overflow: 'auto'
    }
  },

  IsActive: {
    '& $Header': {
      color: theme.color.brand.highlight
    }
  },

  Header: {
    padding: [ theme.grid.stepSize * 1.5, theme.grid.stepSize * 2 ],
    flexBasis: 'auto',
    flexGrow: 0,
    display: 'flex',
    justifyContent: 'space-between',
    'font-size': theme.font.size.small,
    color: theme.color.brand.white,
    cursor: 'pointer',
    '&:hover': {
      '& $CopyIcon': {
        opacity: 1
      }
    }
  },

  Title: {
    fontSize: 'inherit',
    marginRight: theme.grid.stepSize * 1.5,
    margin: 0,
    padding: 0,
    display: 'flex'
  },

  CopyIcon: {
    'flex-grow': 0,
    'flex-shrink': 0,
    'flex-basis': 'auto',
    marginLeft: theme.grid.stepSize,
    fill: theme.color.brand.white,
    opacity: 0,
    marginTop: '-0.1em'
  },

  Timestamp: {
    color: theme.color.brand.midGrey
  },

  Details: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex'
  },

  DetailsGeneric: {
    'border-top': '1px dashed #444',
    padding: [ theme.grid.stepSize, theme.grid.stepSize * 2 ],
    flexGrow: 1,
    flexBasis: '50%',
    'border-right': '1px dashed #444',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  DetailsData: {
    'border-top': '1px dashed #444',
    padding: [ theme.grid.stepSize, theme.grid.stepSize * 2 ],
    flexGrow: 1,
    flexBasis: '50%',
    position: 'relative',
    paddingLeft: theme.grid.stepSize,
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '& > div': {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },

  Copy: {
    cursor: 'pointer',
    position: 'relative',

    '& svg': {
      position: 'absolute',
      top: '-0.1em',
      'padding-left': theme.grid.stepSize,
      opacity: 0,
      fill: theme.color.brand.white,

      '& *': {
        'pointer-events': 'none'
      }
    },

    '&:hover': {
      color: theme.color.brand.white,

      '& svg': {
        opacity: 1
      }
    }
  }
});

const Event = React.memo(({ classes, event, isActive, style, onExpand }) => {
  if (!event) {
    return null;
  }

  const componentClasses = classNames(classes.Event, {
    [classes.IsActive]: isActive
  });

  return (
    <div className={ componentClasses } style={ style }>
      <div className={ classes.Header } onClick={ () => onExpand(event) }>
        <h3 className={ classes.Title }>
          {event.context.name}.{event.aggregate.name}.{event.name}
          <Icon size='s' name='expand-in-modal' className={ classes.CopyIcon } />
        </h3>
        <div className={ classes.Timestamp }>{format(event.metadata.timestamp, 'MM/DD/YYYY, HH:mm:ss.SSS')}</div>
      </div>
      <div className={ classes.Details }>
        <div className={ classes.DetailsGeneric }>
          <JSONTree value={ pick(event, [ 'aggregate.id', 'user', 'metadata.revision' ]) } />
        </div>
        <div className={ classes.DetailsData }>
          <JSONTree value={ pick(event, [ 'data' ]) } />
        </div>
      </div>
    </div>
  );
});

export default injectSheet(styles)(observer(Event));
