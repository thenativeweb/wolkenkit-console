import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import stringifyObject from 'stringify-object';
import { Icon, services, ThemeProvider } from 'thenativeweb-ux';

const copyIconAsHtml = ReactDOMServer.renderToString(<ThemeProvider theme='wolkenkit'><Icon size='s' name='copy' /></ThemeProvider>);

const styles = theme => ({
  PrettyJson: {
    'white-space': 'pre',
    'font-family': theme.font.family.code,
    'font-size': theme.font.size.small
  },

  Copy: {
    cursor: 'pointer',
    position: 'relative',

    '& svg': {
      position: 'absolute',
      top: '-0.1em',
      'padding-left': theme.grid.stepSize,
      opacity: 0,
      fill: theme.color.brand.highlight,

      '& *': {
        'pointer-events': 'none'
      }
    },

    '&:hover': {
      color: theme.color.brand.highlight,

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

const PrettyJson = function ({ classes, value }) {
  if (!value) {
    return null;
  }

  /* eslint-disable no-extra-parens */
  const jsonDetails = formatJson(value, classes.Copy);

  return (
    <div
      className={ classes.PrettyJson }
      onClick={ handleValueClicked }
      dangerouslySetInnerHTML={{ __html: jsonDetails }}
    />
  );
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(PrettyJson));
