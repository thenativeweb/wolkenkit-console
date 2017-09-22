import executeUnsafeCode from '../util/executeUnsafeCode';
import state from '../../state';

const executeCode = function (code) {
  executeUnsafeCode(code, state.backend.app);
};

export default executeCode;
