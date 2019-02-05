import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import AutoSizer from 'react-virtualized-auto-sizer';
import injectSheet from 'react-jss';
import { FixedSizeList as List } from 'react-window';
import PrettyJson from './PrettyJson';
import React from 'react';
import ReadModelItem from './ReadModelItem';
import state from '../state';
import watching from '../actions/watching';
import { Dropdown, Modal } from 'thenativeweb-ux';
import { observer, Observer } from 'mobx-react';

var styles = function styles(theme) {
  return {
    ReadModelConsole: {
      height: '100%',
      width: '100%',
      overflow: 'auto',
      display: 'flex',
      'flex-direction': 'column'
    },
    Bar: {
      'flex-grow': 0,
      display: 'flex',
      padding: theme.grid.stepSize * 2,
      'border-bottom': '1px solid #444',
      'align-items': 'center'
    },
    Items: {
      'flex-grow': 1,
      height: '100%',
      width: '100%',
      overflow: 'auto',
      background: theme.color.brand.dark,
      'font-family': theme.font.family.code,
      'font-size': theme.font.size.small,
      color: '#eee'
    },
    JsonViewer: {
      minWidth: '30vw'
    }
  };
};

var ReadModelConsole =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReadModelConsole, _React$Component);

  _createClass(ReadModelConsole, null, [{
    key: "handleModelChanged",
    value: function handleModelChanged(newModel) {
      watching.startReadingModel(newModel);
    }
  }]);

  function ReadModelConsole() {
    var _this;

    _classCallCheck(this, ReadModelConsole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReadModelConsole).call(this));
    _this.handleJsonClick = _this.handleJsonClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      json: undefined
    };
    return _this;
  }
  /* eslint-disable class-methods-use-this */


  _createClass(ReadModelConsole, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var listNames = Object.keys(state.backend.configuration.readModel.lists);

      if (listNames[0]) {
        watching.startReadingModel(listNames[0]);
      }
    }
    /* eslint-enable class-methods-use-this */

    /* eslint-disable class-methods-use-this */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      watching.stopReadingModel();
    }
    /* eslint-enable class-methods-use-this */

  }, {
    key: "handleJsonClick",
    value: function handleJsonClick(value) {
      this.setState({
        json: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!state.backend.configuration || !state.watching.selectedReadModel) {
        return null;
      }

      var classes = this.props.classes;
      var json = this.state.json; // This use of mobx Observer here is needed in order to trigger updates on items
      // https://github.com/mobxjs/mobx-react/issues/484

      return React.createElement("div", {
        className: classes.ReadModelConsole
      }, React.createElement("div", {
        className: classes.Bar
      }, React.createElement(Dropdown, {
        size: "s",
        options: Object.keys(state.backend.configuration.readModel.lists).map(function (list) {
          return {
            label: list,
            value: list
          };
        }),
        value: state.watching.selectedReadModel,
        onChange: ReadModelConsole.handleModelChanged
      })), React.createElement("div", {
        className: classes.Items
      }, React.createElement(AutoSizer, null, function (_ref) {
        var height = _ref.height,
            width = _ref.width;
        return React.createElement(Observer, null, function () {
          return React.createElement(List, {
            width: width,
            height: height,
            itemCount: state.watching.selectedReadModelItems.length,
            itemSize: 68,
            itemData: state.watching.selectedReadModelItems,
            itemKey: function itemKey(index, data) {
              return data[index].id;
            }
          }, function (_ref2) {
            var index = _ref2.index,
                style = _ref2.style;
            var item = state.watching.selectedReadModelItems[index];
            return React.createElement(ReadModelItem, {
              key: item.id,
              item: item,
              onJsonClick: _this2.handleJsonClick,
              style: style
            });
          });
        });
      })), React.createElement(Modal, {
        className: classes.JsonViewer,
        isVisible: json !== undefined,
        onCancel: function onCancel() {
          return _this2.setState({
            json: undefined
          });
        },
        attach: "right"
      }, React.createElement(PrettyJson, {
        value: json,
        useWorker: true
      })));
    }
  }]);

  return ReadModelConsole;
}(React.Component);

export default injectSheet(styles)(observer(ReadModelConsole));