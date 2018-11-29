import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import backend from '../backend';
import state from '../../state';

var tryToConnect = function tryToConnect() {
  state.connecting.shouldAutoConnect = true;

  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var options;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              host: state.connecting.host,
              port: state.connecting.port
            };

            if (state.connecting.useAuthentication) {
              options.authentication = {
                identityProviderUrl: state.connecting.authentication.identityProviderUrl,
                clientId: state.connecting.authentication.clientId,
                scope: state.connecting.authentication.scope,
                strictMode: state.connecting.authentication.strictMode
              };
            }

            _context.next = 4;
            return backend.connect(options);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))();
};

export default tryToConnect;