import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import { Dropdown } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import ReadModelItem from './ReadModelItem';
import state from '../state';
import watching from '../actions/watching';

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
    _this.saveContainerRef = _this.saveContainerRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ReadModelConsole, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mutationObserver = new MutationObserver(function () {
        if (_this2.container && document.contains(_this2.container)) {
          _this2.container.scrollTop = _this2.container.scrollHeight;
        }
      });
      this.mutationObserver.observe(this.container, {
        childList: true
      });
      var listNames = Object.keys(state.backend.configuration.readModel.lists);
      watching.startReadingModel(listNames[0]);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      watching.stopReadingModel();
      this.mutationObserver.disconnect();
    }
  }, {
    key: "saveContainerRef",
    value: function saveContainerRef(ref) {
      this.container = ref;
    }
  }, {
    key: "render",
    value: function render() {
      if (!state.backend.configuration || !state.watching.selectedReadModel) {
        return null;
      }

      var classes = this.props.classes;
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
        className: classes.Items,
        ref: this.saveContainerRef
      }, state.watching.selectedReadModelItems.map(function (item) {
        return React.createElement(ReadModelItem, {
          key: item.id,
          item: item
        });
      })));
    }
  }]);

  return ReadModelConsole;
}(React.Component);

export default injectSheet(styles)(observer(ReadModelConsole));