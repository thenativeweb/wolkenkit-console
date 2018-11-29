import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import axios from 'axios';

var loadConfiguration =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(options) {
    var host, port, response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options) {
              _context.next = 2;
              break;
            }

            throw new Error('Options are missing.');

          case 2:
            if (options.host) {
              _context.next = 4;
              break;
            }

            throw new Error('Host is missing.');

          case 4:
            if (options.port) {
              _context.next = 6;
              break;
            }

            throw new Error('Port is missing.');

          case 6:
            host = options.host, port = options.port;
            _context.next = 9;
            return axios.get("https://".concat(host, ":").concat(port, "/v1/configuration.json"));

          case 9:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadConfiguration(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default loadConfiguration;