import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import connecting from '../actions/connecting';
import injectSheet from 'react-jss';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';
import { Button, CheckBox, ControlGroup, Form, Headline, Message, Product, Sidebar, TextBox, View } from 'thenativeweb-ux';

var styles = function styles() {
  return {
    ConnectionForm: {
      width: '60vw',
      'max-width': '460px',
      'margin-top': '10vh',
      'margin-bottom': '10vh'
    },
    Actions: {
      'border-top': 0,
      'margin-top': 0,
      'padding-top': 0
    }
  };
};

var isConnectDisabled = function isConnectDisabled() {
  return !state.connecting.host || !state.connecting.port || state.connecting.useAuthentication && (!state.connecting.authentication.identityProviderUrl || !state.connecting.authentication.clientId);
};

var Connect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Connect, _React$Component);

  function Connect() {
    _classCallCheck(this, Connect);

    return _possibleConstructorReturn(this, _getPrototypeOf(Connect).apply(this, arguments));
  }

  _createClass(Connect, [{
    key: "componentDidMount",

    /* eslint-disable class-methods-use-this */
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!state.connecting.shouldAutoConnect) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return connecting.tryToConnect();

              case 3:
                _context.next = 6;
                break;

              case 5:
                connecting.getConnectionOptionsFromUrl();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
    /* eslint-enable class-methods-use-this */

  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      if (!state.backend || !state.backend.isConnected) {
        return React.createElement(React.Fragment, null, React.createElement(Sidebar, null, React.createElement(Sidebar.Brand, null, React.createElement(Product, {
          name: "console"
        }))), React.createElement(View, {
          orientation: "vertical",
          alignItems: "center",
          scrollable: "auto"
        }, React.createElement(Form, {
          className: classes.ConnectionForm,
          onSubmit: connecting.handleConnectFormSubmitted
        }, React.createElement(Headline, null, "Connect to\u2026"), state.connecting.error ? React.createElement(Message, {
          type: "error"
        }, state.connecting.error) : null, React.createElement(ControlGroup, null, React.createElement(ControlGroup.Item, {
          label: "Host",
          adjust: "flex"
        }, React.createElement(TextBox, {
          name: "host",
          autoFocus: true,
          value: state.connecting.host,
          onChange: connecting.handleInputChanged,
          placeholder: "local.wolkenkit.io"
        })), React.createElement(ControlGroup.Item, {
          label: "Port",
          adjust: "auto"
        }, React.createElement(TextBox, {
          name: "port",
          type: "port",
          value: String(state.connecting.port),
          onChange: connecting.handleInputChanged,
          placeholder: "3000"
        }))), React.createElement(ControlGroup, null, React.createElement(ControlGroup.Item, {
          type: "checkbox",
          label: "Use authentication",
          adjust: "flex",
          helpLink: "https://docs.wolkenkit.io/latest/reference/configuring-an-application/enabling-authentication/"
        }, React.createElement(CheckBox, {
          id: "use-authentication",
          checked: state.connecting.useAuthentication,
          onChange: connecting.handleAuthenticationChanged
        }))), state.connecting.useAuthentication ? React.createElement(React.Fragment, null, React.createElement(ControlGroup, null, React.createElement(ControlGroup.Item, {
          label: "Identity provider url",
          adjust: "flex"
        }, React.createElement(TextBox, {
          name: "authentication.identityProviderUrl",
          autoFocus: true,
          value: state.connecting.authentication.identityProviderUrl,
          onChange: connecting.handleInputChanged,
          placeholder: "https://your-identity-provider.com/authorize"
        }))), React.createElement(ControlGroup, null, React.createElement(ControlGroup.Item, {
          label: "Client ID",
          adjust: "flex"
        }, React.createElement(TextBox, {
          name: "authentication.clientId",
          value: state.connecting.authentication.clientId,
          onChange: connecting.handleInputChanged,
          placeholder: "LKhjasdkfj\u2026"
        }))), React.createElement(ControlGroup, null, React.createElement(ControlGroup.Item, {
          label: "Scope",
          adjust: "flex"
        }, React.createElement(TextBox, {
          name: "authentication.scope",
          value: state.connecting.authentication.scope,
          onChange: connecting.handleInputChanged,
          placeholder: "profile"
        }))), React.createElement(ControlGroup, null, React.createElement(ControlGroup.Item, {
          type: "checkbox",
          label: "Use strict mode",
          adjust: "flex"
        }, React.createElement(CheckBox, {
          id: "authentication.strictMode",
          name: "authentication.strictMode",
          checked: state.connecting.authentication.strictMode,
          onChange: connecting.handleInputChanged
        })))) : null, React.createElement(Form.Actions, {
          className: classes.Actions,
          type: "stacked"
        }, React.createElement(Button, {
          isPrimary: true,
          disabled: isConnectDisabled()
        }, "Connect")))));
      }
    }
  }]);

  return Connect;
}(React.Component);

export default injectSheet(styles)(observer(Connect));