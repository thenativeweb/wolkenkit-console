import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import loadConfiguration from '../util/loadConfiguration';
import state from '../../state';
import watching from '../watching';
import wolkenkit from 'wolkenkit-client';
import { extendObservable, runInAction } from 'mobx';

var connect =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(options) {
    var host, port, authentication, isAuthenticationEnabled, app, configuration, authProvider;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options.host) {
              _context.next = 2;
              break;
            }

            throw new Error('Host is missing.');

          case 2:
            if (options.port) {
              _context.next = 4;
              break;
            }

            throw new Error('Port is missing.');

          case 4:
            if (!options.authentication) {
              _context.next = 9;
              break;
            }

            if (!(options.authentication.identityProviderUrl && !options.authentication.clientId)) {
              _context.next = 7;
              break;
            }

            throw new Error('Client ID is missing.');

          case 7:
            if (!(!options.authentication.identityProviderUrl && options.authentication.clientId)) {
              _context.next = 9;
              break;
            }

            throw new Error('Identity provider URL is missing.');

          case 9:
            host = options.host, port = options.port;
            authentication = options.authentication || {};
            isAuthenticationEnabled = authentication.identityProviderUrl && authentication.clientId;
            _context.prev = 12;
            _context.next = 15;
            return loadConfiguration({
              host: host,
              port: port
            });

          case 15:
            configuration = _context.sent;
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](12);
            state.connecting.shouldAutoConnect = false;
            state.connecting.error = 'Failed to connect, is the backend running?';
            return _context.abrupt("return");

          case 23:
            if (isAuthenticationEnabled) {
              authProvider = new wolkenkit.authentication.OpenIdConnect(authentication);
            }

            _context.prev = 24;
            _context.next = 27;
            return wolkenkit.connect({
              host: host,
              port: port,
              authentication: authProvider
            });

          case 27:
            app = _context.sent;
            _context.next = 35;
            break;

          case 30:
            _context.prev = 30;
            _context.t1 = _context["catch"](24);
            state.connecting.shouldAutoConnect = false;
            state.connecting.error = 'Failed to connect, is the backend running?';
            return _context.abrupt("return");

          case 35:
            runInAction(function () {
              state.backend = {};
              extendObservable(state.backend, {
                app: app,
                host: host,
                port: port,
                isConnected: false,
                configuration: configuration,
                authentication: authentication,
                error: undefined,
                user: app.auth.getProfile()
              });
            });

            if (!(isAuthenticationEnabled && !app.auth.isLoggedIn())) {
              _context.next = 38;
              break;
            }

            return _context.abrupt("return", app.auth.login());

          case 38:
            state.backend.isConnected = true; // Commented, because the connected event didn't work reliably. We should
            // have another look at this in the future.
            // app.on('connected', () => {
            //   state.backend.isReachable = true;
            // });

            app.on('disconnected', function () {
              state.backend.error = 'Lost connection, is the backend running?';
            });
            watching.startObservingEvents();

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 18], [24, 30]]);
  }));

  return function connect(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default connect;