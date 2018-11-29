import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import classNames from 'classnames';
import debugging from '../actions/debugging';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';
import { Button, View } from 'thenativeweb-ux';

var styles = function styles(theme) {
  return {
    ErrorConsole: {
      overflow: 'hidden',
      display: 'flex',
      'flex-direction': 'column',
      'border-top': '1px solid #eee',
      height: 48,
      transition: 'height 200ms ease-in-out',
      'will-change': 'height'
    },
    IsExpanded: {
      height: '300px'
    },
    Link: {
      background: 'transparent',
      color: theme.color.brand.highlight,
      border: 0,
      '&:active, &:focus': {
        background: 'transparent',
        color: theme.color.brand.highlight
      }
    },
    Header: {
      height: 48,
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      padding: [theme.grid.stepSize * 2, theme.grid.stepSize],
      'border-bottom': '1px solid #eee'
    },
    HeaderSpacer: {
      'flex-grow': 1
    },
    Messages: {
      'font-family': theme.font.family.code,
      overflow: 'auto',
      'flex-grow': 1
    },
    Message: {
      'font-size': theme.font.size.small,
      padding: [theme.grid.stepSize, theme.grid.stepSize * 2],
      'border-bottom': '1px solid #eee',
      '& h3': {
        'font-size': theme.font.size.small
      }
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
  }]);

  function ErrorConsole() {
    var _this;

    _classCallCheck(this, ErrorConsole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorConsole).call(this));
    _this.renderMessage = _this.renderMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleExpandClicked = _this.handleExpandClicked.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCloseClicked = _this.handleCloseClicked.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isExpanded: false
    };
    return _this;
  }

  _createClass(ErrorConsole, [{
    key: "handleExpandClicked",
    value: function handleExpandClicked() {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
  }, {
    key: "handleCloseClicked",
    value: function handleCloseClicked() {
      this.setState({
        isExpanded: false
      });
    }
  }, {
    key: "renderMessage",
    value: function renderMessage(error, index) {
      var classes = this.props.classes;
      var content;

      if (error.message && error.name) {
        content = React.createElement(React.Fragment, null, React.createElement("h3", null, "Error: ", error.message), React.createElement("p", null, error.stack));

        if (error.name === 'CommandRejected' || error.name === 'CommandFailed') {
          content = React.createElement("h3", null, "Command got rejected: ", error.message);
        }
      } else if (_typeof(error) === 'object') {
        content = React.createElement("h3", null, JSON.stringify(error));
      } else {
        content = React.createElement("h3", null, error);
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
      var isExpanded = this.state.isExpanded;

      if (!state.debugging.messages) {
        return null;
      }

      var componentClasses = classNames(classes.ErrorConsole, _defineProperty({}, classes.IsExpanded, isExpanded));
      return React.createElement("div", {
        className: componentClasses
      }, React.createElement(View, {
        orientation: "horizontal",
        adjust: "auto",
        className: classes.Header
      }, React.createElement(Button, {
        className: classes.Link,
        onClick: this.handleExpandClicked
      }, "Logs and Errors: (", state.debugging.messages.length, ")"), React.createElement(Button, {
        className: classes.Link,
        onClick: ErrorConsole.handleClearClicked
      }, "Clear"), React.createElement("div", {
        className: classes.HeaderSpacer
      }), this.state.isExpanded ? React.createElement(Button, {
        className: classes.Link,
        onClick: this.handleCloseClicked
      }, "Close") : null), React.createElement("div", {
        className: classes.Messages
      }, state.debugging.messages.length === 0 ? React.createElement("div", {
        className: classes.Hint
      }, "No errors encountered yet. Well done!") : '',
      /* eslint-disable no-extra-parens */
      state.debugging.messages.map(this.renderMessage)
      /* eslint-enable no-extra-parens */
      ));
    }
  }]);

  return ErrorConsole;
}(React.Component);

export default injectSheet(styles)(observer(ErrorConsole));