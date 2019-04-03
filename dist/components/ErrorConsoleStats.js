import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import { Button } from 'thenativeweb-ux';
import debugging from '../actions/debugging';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';

var styles = function styles() {
  return {
    ErrorConsoleStats: {},
    Link: {
      margin: 0
    }
  };
};

var ErrorConsoleStats =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ErrorConsoleStats, _React$Component);

  function ErrorConsoleStats() {
    _classCallCheck(this, ErrorConsoleStats);

    return _possibleConstructorReturn(this, _getPrototypeOf(ErrorConsoleStats).apply(this, arguments));
  }

  _createClass(ErrorConsoleStats, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return React.createElement("div", {
        className: classes.ErrorConsoleStats
      }, React.createElement(Button, {
        isSubtle: true,
        className: classes.Link,
        onClick: ErrorConsoleStats.handleExpandClicked
      }, "Logs and Errors: ", state.debugging.messages.length));
    }
  }], [{
    key: "handleExpandClicked",
    value: function handleExpandClicked() {
      debugging.toggleErrorConsole();
    }
  }]);

  return ErrorConsoleStats;
}(React.Component);

export default injectSheet(styles)(observer(ErrorConsoleStats));