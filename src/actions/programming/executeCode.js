import executeUnsafeCode from '../util/executeUnsafeCode';
import services from '../../services';
import state from '../../state';

const executeCode = function () {
  executeUnsafeCode(state.programming.code, services.backend);
};

export default executeCode;
