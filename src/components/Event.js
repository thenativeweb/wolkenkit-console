import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import stringifyObject from 'stringify-object';
import { toJS } from 'mobx';
import { Icon, services, ThemeProvider } from 'thenativeweb-ux';

const copyIconAsHtml = ReactDOMServer.renderToString(<ThemeProvider theme='wolkenkit'><Icon size='s' name='copy' /></ThemeProvider>);

const styles = theme => ({
  Event: {
    padding: theme.grid.stepSize * 2,
    'border-bottom': '1px solid #444',
    color: '#666',
    'white-space': 'pre',
    'line-height': 1.2,
    boxSizing: 'border-box'
  },

  Title: {
    'font-size': theme.font.size.small,
    'margin-bottom': theme.grid.stepSize / 2,
    color: theme.color.brand.white,
    margin: 0,
    padding: 0
  },

  Details: {},

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

const Event = function ({ classes, event, style }) {
  if (!event) {
    return null;
  }

  const full = [ 'context', 'aggregate.name', 'name', 'type', 'custom', 'metadata.published', 'metadata.position' ];
  const compact = [ ...full, 'id', 'metadata' ];

  /* eslint-disable no-extra-parens */
  const eventDetails = formatJson(omit(toJS(event), compact), classes.Copy);

  return (
    <div className={ classes.Event } style={ style }>
      <h3 className={ classes.Title }>{event.context.name}.{event.aggregate.name}.{event.name}</h3>
      <div
        className={ classes.Details }
        onClick={ handleValueClicked }
        dangerouslySetInnerHTML={{ __html: eventDetails }}
      />
    </div>
  );
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(Event));
