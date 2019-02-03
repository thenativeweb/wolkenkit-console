import copy from 'copy-text-to-clipboard';
import formatJson from './formatJson';
import injectSheet from 'react-jss';
import JsonFormatterWorker from 'worker-loader!./JsonFormatterWorker.js';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BusyIndicator, Icon, services, ThemeProvider } from 'thenativeweb-ux';

const copyIconAsHtml = ReactDOMServer.renderToString(<ThemeProvider theme='wolkenkit'><Icon size='s' name='copy' /></ThemeProvider>);

const jsonFormatterWorker = new JsonFormatterWorker();

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

class PrettyJson extends React.Component {
  constructor (props) {
    super(props);

    if (props.useWorker === true) {
      this.handleWorkerMessage = this.handleWorkerMessage.bind(this);

      this.state = {
        json: undefined
      };
    }
  }

  componentDidMount () {
    const { value, classes, useWorker } = this.props;

    if (useWorker) {
      jsonFormatterWorker.postMessage({ value: JSON.stringify(value), copyClassName: classes.Copy, copyIconAsHtml });
      jsonFormatterWorker.addEventListener('message', this.handleWorkerMessage);
    }
  }

  componentWillUnmount () {
    const { useWorker } = this.props;

    if (useWorker) {
      jsonFormatterWorker.removeEventListener('message', this.handleWorkerMessage);
    }
  }

  handleWorkerMessage (event) {
    this.setState({
      json: event.data
    });
  }

  render () {
    const { classes, useWorker, value } = this.props;

    let formattedJson;

    if (useWorker) {
      const { json } = this.state;

      if (!json) {
        return <BusyIndicator />;
      }
      formattedJson = json;
    } else {
      formattedJson = formatJson(value, classes.Copy, copyIconAsHtml);
    }

    return (
      <div
        className={ classes.PrettyJson }
        onClick={ handleValueClicked }
        dangerouslySetInnerHTML={{ __html: formattedJson }}
      />
    );
  }
}

export default injectSheet(styles)(observer(PrettyJson));
