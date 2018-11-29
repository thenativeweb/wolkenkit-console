import executeUnsafeCode from '../util/executeUnsafeCode';
import state from '../../state';

var executeCode = function executeCode(code) {
  executeUnsafeCode(code, state.backend.app);
};

export default executeCode;