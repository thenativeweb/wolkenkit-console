import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import { Button } from 'thenativeweb-ux';
import classNames from 'classnames';
import debugging from '../actions/debugging';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';

var styles = function styles(theme) {
  return {
    ErrorConsole: {
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
      height: 0,
      transition: 'height 200ms ease-in-out',
      'will-change': 'height',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: 1,
        background: '#eee'
      }
    },
    IsExpanded: {
      height: '300px'
    },
    Header: {
      height: 48,
      'flex-grow': 0,
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      padding: [0, theme.grid.stepSize],
      'border-bottom': '1px solid #eee'
    },
    HeaderSpacer: {
      'flex-grow': 1
    },
    Messages: {
      overflow: 'auto',
      'flex-grow': 1,
      'font-family': theme.font.family.code,
      'font-size': theme.font.size.small
    },
    Message: {
      padding: [theme.grid.stepSize, theme.grid.stepSize * 2],
      'border-bottom': '1px solid #eee'
    },
    MessageContent: {
      'font-size': theme.font.size.small,
      'word-break': 'break-all'
    },
    Hint: {
      'font-size': theme.font.size.small,
      padding: theme.grid.stepSize * 2
    }
  };
};

var ErrorConsole =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ErrorConsole, _React$Component);

  _createClass(ErrorConsole, null, [{
    key: "handleClearClicked",
    value: function handleClearClicked(event) {
      event.preventDefault();
      debugging.clear();
    }
  }, {
    key: "handleCloseClicked",
    value: function handleCloseClicked(event) {
      event.preventDefault();
      debugging.hideErrorConsole();
    }
  }]);

  function ErrorConsole() {
    var _this;

    _classCallCheck(this, ErrorConsole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorConsole).call(this));
    _this.renderMessage = _this.renderMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ErrorConsole, [{
    key: "renderMessage",
    value: function renderMessage(error, index) {
      var classes = this.props.classes;
      var content;

      if (error.message && error.name) {
        content = React.createElement(React.Fragment, null, React.createElement("h3", null, "Error: ", error.message), React.createElement("p", null, error.stack));

        if (error.name === 'CommandRejected' || error.name === 'CommandFailed') {
          content = React.createElement("div", {
            className: classes.MessageContent
          }, "Command got rejected: ", error.message);
        }
      } else if (_typeof(error) === 'object') {
        content = React.createElement("div", {
          className: classes.MessageContent
        }, JSON.stringify(error));
      } else {
        content = React.createElement("div", {
          className: classes.MessageContent
        }, error);
      }

      return React.createElement("div", {
        key: index,
        className: classes.Message
      }, content);
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      if (!state.debugging.messages) {
        return null;
      }

      var componentClasses = classNames(classes.ErrorConsole, _defineProperty({}, classes.IsExpanded, state.debugging.errorConsoleVisible));
      return React.createElement("div", {
        className: componentClasses
      }, React.createElement("div", {
        className: classes.Header
      }, React.createElement(Button, {
        icon: "clear",
        isSubtle: true,
        onClick: ErrorConsole.handleClearClicked
      }, "Clear"), React.createElement("div", {
        className: classes.HeaderSpacer
      }), React.createElement(Button, {
        icon: "close",
        isSubtle: true,
        onClick: ErrorConsole.handleCloseClicked
      })), React.createElement("div", {
        className: classes.Messages
      }, state.debugging.messages.length === 0 ? React.createElement("div", {
        className: classes.Hint
      }, "No errors encountered yet. Well done!") : '', state.debugging.messages.map(this.renderMessage)));
    }
  }]);

  return ErrorConsole;
}(React.Component);

export default injectSheet(styles)(observer(ErrorConsole));