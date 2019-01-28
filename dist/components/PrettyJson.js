import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import copy from 'copy-text-to-clipboard';
import injectSheet from 'react-jss';
import JsonFormatterWorker from 'worker-loader!./JsonFormatterWorker.js';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BusyIndicator, Icon, services, ThemeProvider } from 'thenativeweb-ux';
var copyIconAsHtml = ReactDOMServer.renderToString(React.createElement(ThemeProvider, {
  theme: "wolkenkit"
}, React.createElement(Icon, {
  size: "s",
  name: "copy"
})));
var jsonFormatterWorker = new JsonFormatterWorker();

var styles = function styles(theme) {
  return {
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

var PrettyJson =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PrettyJson, _React$Component);

  function PrettyJson(props) {
    var _this;

    _classCallCheck(this, PrettyJson);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrettyJson).call(this, props));
    _this.handleWorkerMessage = _this.handleWorkerMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      json: undefined
    };
    return _this;
  }

  _createClass(PrettyJson, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          value = _this$props.value,
          classes = _this$props.classes;
      jsonFormatterWorker.postMessage({
        value: JSON.stringify(value),
        copyClassName: classes.Copy,
        copyIconAsHtml: copyIconAsHtml
      });
      jsonFormatterWorker.addEventListener('message', this.handleWorkerMessage);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      jsonFormatterWorker.removeEventListener('message', this.handleWorkerMessage);
    }
  }, {
    key: "handleWorkerMessage",
    value: function handleWorkerMessage(event) {
      this.setState({
        json: event.data
      });
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var json = this.state.json;

      if (!json) {
        return React.createElement(BusyIndicator, null);
      }

      return React.createElement("div", {
        className: classes.PrettyJson,
        onClick: handleValueClicked,
        dangerouslySetInnerHTML: {
          __html: json
        }
      });
    }
  }]);

  return PrettyJson;
}(React.Component);

export default injectSheet(styles)(observer(PrettyJson));