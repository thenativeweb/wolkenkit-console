import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import App from './App';
import checkUrlForResetOption from './actions/checkUrlForResetOption';
import React from 'react';
import { render } from 'react-dom';
checkUrlForResetOption();

_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          render(React.createElement(App, null), document.querySelector('#root'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}))();