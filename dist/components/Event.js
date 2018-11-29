import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import stringifyObject from 'stringify-object';
import { toJS } from 'mobx';
import { Icon, services, ThemeProvider } from 'thenativeweb-ux';
var copyIconAsHtml = ReactDOMServer.renderToString(React.createElement(ThemeProvider, {
  theme: "wolkenkit"
}, React.createElement(Icon, {
  size: "s",
  name: "copy"
})));

var styles = function styles(theme) {
  return {
    Event: {
      padding: theme.grid.stepSize * 2,
      'border-bottom': '1px solid #444',
      color: '#666',
      'white-space': 'pre',
      'line-height': 1.2
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
  };
};

var handleValueClicked = function handleValueClicked(event) {
  var target = event.target.classList.contains('tnw-copy') ? event.target : null;

  if (!target) {
    target = event.target.parentElement.classList.contains('tnw-copy') ? event.target.parentElement : null;
  }

  if (target) {
    var text = target.innerText;
    copy(JSON.parse(text));
    services.notifications.show({
      type: 'success',
      text: "Copied to clipboard!"
    });
  }
};

var formatJson = function formatJson(eventData, copyClassName) {
  var pretty = stringifyObject(eventData, {
    indent: '  ',
    singleQuotes: false,
    transform: function transform(obj, prop, originalResult) {
      if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        return "<span class=\"tnw-copy ".concat(copyClassName, "\">").concat(originalResult).concat(copyIconAsHtml, "</span>");
      }

      return originalResult;
    }
  });
  return pretty;
};

var Event = function Event(_ref) {
  var classes = _ref.classes,
      event = _ref.event;

  if (!event) {
    return null;
  }

  var full = ['context', 'aggregate.name', 'name', 'type', 'custom', 'metadata.published', 'metadata.position'];
  var compact = full.concat(['id', 'metadata']);
  /* eslint-disable no-extra-parens */

  var eventDetails = formatJson(omit(toJS(event), compact), classes.Copy);
  return React.createElement("div", {
    className: classes.Event
  }, React.createElement("h3", {
    className: classes.Title
  }, event.context.name, ".", event.aggregate.name, ".", event.name), React.createElement("div", {
    className: classes.Details,
    onClick: handleValueClicked,
    dangerouslySetInnerHTML: {
      __html: eventDetails
    }
  }));
  /* eslint-enable no-extra-parens */
};

export default injectSheet(styles)(observer(Event));