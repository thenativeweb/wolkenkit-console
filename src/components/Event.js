import classNames from 'classnames';
import copy from 'copy-text-to-clipboard';
import format from 'date-fns/format';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import stringifyObject from 'stringify-object';
import { Icon, services, ThemeProvider } from 'thenativeweb-ux';

const copyIconAsHtml = ReactDOMServer.renderToString(<ThemeProvider theme='wolkenkit'><Icon size='s' name='copy' /></ThemeProvider>);

const styles = theme => ({
  Event: {
    display: 'flex',
    flexDirection: 'column',
    'border-bottom': `1px solid ${theme.color.brand.midGrey}`,
    color: '#666',
    'white-space': 'pre',
    'line-height': 1.1,
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: 'background 200ms ease-in-out',
    willChange: 'background',

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.1)'
    }
  },

  IsActive: {
    backend: theme.color.brand.highlight
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
    'border-right': '1px dashed #444'
  },

  DetailsData: {
    'border-top': '1px dashed #444',
    padding: [ theme.grid.stepSize, theme.grid.stepSize * 2 ],
    flexGrow: 1,
    flexBasis: '50%',
    position: 'relative',
    paddingLeft: theme.grid.stepSize
  },

  DetailsDataLabel: {
    position: 'absolute',
    right: 0,
    top: -1,
    opacity: 0.8,
    padding: [ theme.grid.stepSize / 2, theme.grid.stepSize ],
    background: theme.color.brand.midGrey,
    color: theme.color.brand.dark,
    'font-size': theme.font.size.xsmall,
    borderRadius: [ 0, 0, 0, 8 ]
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

const handleValueClicked = function (event) {
  let target = event.target.classList.contains('tnw-copy') ? event.target : null;

  if (!target) {
    target = event.target.parentElement.classList.contains('tnw-copy') ? event.target.parentElement : null;
  }

  if (target) {
    const text = target.innerText;

    copy(JSON.parse(text));
    services.notifications.show({ type: 'success', text: `Copied to clipboard!` });
  }
};

const formatJson = function (eventData, copyClassName) {
  const pretty = stringifyObject(eventData, {
    indent: '  ',
    singleQuotes: false,
    transform: (obj, prop, originalResult) => {
      if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        return `<span class="tnw-copy ${copyClassName}">${originalResult}${copyIconAsHtml}</span>`;
      }

      return originalResult;
    }
  });

  return pretty;
};

const Event = React.memo(({ classes, event, isActive, style, onExpand }) => {
  if (!event) {
    return null;
  }

  const simplifiedEvent = omit(event, [
    'context',
    'aggregate.name',
    'name',
    'type',
    'custom',
    'metadata.published',
    'metadata.position',
    'id',
    'metadata',
    'data'
  ]);

  const detailsGenericHtml = formatJson(simplifiedEvent, classes.Copy);
  const dataHtml = formatJson(event.data, classes.Copy);

  const componentClasses = classNames(classes.Event, {
    [classes.IsActive]: isActive
  });

  return (
    <div className={ componentClasses } style={ style }>
      <div className={ classes.Header } onClick={ () => onExpand(event) }>
        <h3 className={ classes.Title }>
          {event.context.name}.{event.aggregate.name}.{event.name}
          <Icon
            size='s'
            name='expand-in-modal'
            className={ classes.CopyIcon }
          />
        </h3>
        <div className={ classes.Timestamp }>{format(event.metadata.timestamp, 'MM/DD/YYYY, HH:mm:ss.SSS')}</div>
      </div>
      <div className={ classes.Details }>
        <div
          className={ classes.DetailsGeneric }
          onClick={ handleValueClicked }
          dangerouslySetInnerHTML={{ __html: detailsGenericHtml }}
        />
        <div
          className={ classes.DetailsData }
        >
          <label className={ classes.DetailsDataLabel }>data</label>
          <div
            onClick={ handleValueClicked }
            dangerouslySetInnerHTML={{ __html: dataHtml }}
          />
        </div>
      </div>
    </div>
  );
});

export default injectSheet(styles)(observer(Event));
