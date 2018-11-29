import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import Event from './Event';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';

var styles = function styles(theme) {
  return {
    EventConsole: {
      height: '100%',
      width: '100%',
      overflow: 'auto',
      background: theme.color.brand.dark,
      'font-family': theme.font.family.code,
      'font-size': theme.font.size.small,
      color: theme.color.brand.light
    },
    Hint: {
      opacity: 0.5,
      padding: theme.grid.stepSize * 2
    }
  };
};

var EventConsole =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EventConsole, _React$Component);

  function EventConsole(props) {
    var _this;

    _classCallCheck(this, EventConsole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventConsole).call(this, props));
    _this.state = {
      prevEventCount: undefined
    };
    _this.scrollContainerRef = React.createRef();
    return _this;
  }

  _createClass(EventConsole, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.prevEventCount !== state.watching.collectedEvents.length) {
        var domElement = this.scrollContainerRef.current;

        if (domElement) {
          domElement.scrollTop = domElement.scrollHeight;
        }

        this.setState({
          prevEventCount: state.watching.collectedEvents.length
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return React.createElement("div", {
        className: classes.EventConsole,
        ref: this.scrollContainerRef
      }, state.watching.collectedEvents.length === 0 ? React.createElement("div", {
        className: classes.Hint
      }, "No events have been observed yet. Go ahead and send a command\u2026") : '', state.watching.collectedEvents.map(function (event) {
        return React.createElement(Event, {
          key: event.id,
          event: event
        });
      }));
    }
  }]);

  return EventConsole;
}(React.Component);

export default injectSheet(styles)(observer(EventConsole));