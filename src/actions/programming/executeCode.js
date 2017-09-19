import executeUnsafeCode from '../util/executeUnsafeCode';
import services from '../../services';

const executeCode = function (code) {
  executeUnsafeCode(code, services.backend);
};

export default executeCode;
