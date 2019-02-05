import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import AutoSizer from 'react-virtualized-auto-sizer';
import Event from './Event';
import injectSheet from 'react-jss';
import { FixedSizeList as List } from 'react-window';
import ListItem from './ListItem';
import { Modal } from 'thenativeweb-ux';
import { observer } from 'mobx-react';
import PrettyJson from './PrettyJson';
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
    },
    JsonViewer: {
      minWidth: '30vw'
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
    _this.handleEventExpand = _this.handleEventExpand.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.setListRef = function (element) {
      _this.listRef = element;

      _this.updateScrollPosition();
    };

    _this.state = {
      selectedEvent: undefined,
      previousEventCount: undefined,
      scrollToIndex: state.watching.collectedEvents.length - 1
    };
    return _this;
  }

  _createClass(EventConsole, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var previousEventCount = this.state.previousEventCount;
      var newEventCount = state.watching.collectedEvents.length;

      if (previousEventCount !== newEventCount) {
        this.setState({
          previousEventCount: newEventCount,
          scrollToIndex: newEventCount - 1
        }, function () {
          _this2.updateScrollPosition();
        });
      }
    }
  }, {
    key: "updateScrollPosition",
    value: function updateScrollPosition() {
      if (this.listRef) {
        this.listRef.scrollToItem(this.state.scrollToIndex);
      }
    }
  }, {
    key: "handleEventExpand",
    value: function handleEventExpand(selectedEvent) {
      this.setState({
        selectedEvent: selectedEvent
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var classes = this.props.classes;
      var _this$state$selectedE = this.state.selectedEvent,
          selectedEvent = _this$state$selectedE === void 0 ? {} : _this$state$selectedE;
      return React.createElement("div", {
        className: classes.EventConsole
      }, state.watching.collectedEvents.length === 0 ? React.createElement("div", {
        className: classes.Hint
      }, "No events have been observed yet. Go ahead and send a command\u2026") : '', React.createElement(AutoSizer, null, function (_ref) {
        var height = _ref.height,
            width = _ref.width;
        return React.createElement(List, {
          ref: _this3.setListRef,
          width: width,
          height: height,
          itemCount: state.watching.collectedEvents.length,
          itemSize: 200,
          itemData: state.watching.collectedEvents,
          itemKey: function itemKey(index, data) {
            return data[index].id;
          }
        }, function (_ref2) {
          var index = _ref2.index,
              style = _ref2.style;
          var event = state.watching.collectedEvents[index];
          return React.createElement(ListItem, {
            key: event.id,
            style: style
          }, React.createElement(Event, {
            event: event,
            isActive: event.id === selectedEvent.id,
            onExpand: _this3.handleEventExpand
          }));
        });
      }), React.createElement(Modal, {
        header: "Event Details",
        className: classes.JsonViewer,
        isVisible: selectedEvent.id !== undefined,
        onCancel: function onCancel() {
          return _this3.setState({
            selectedEvent: undefined
          });
        },
        attach: "right"
      }, React.createElement(PrettyJson, {
        value: selectedEvent,
        useWorker: true
      })));
    }
  }]);

  return EventConsole;
}(React.Component);

export default injectSheet(styles)(observer(EventConsole));