import debugging from '../debugging';
/* eslint-disable no-unused-vars */

var executeUnsafeCode = function executeUnsafeCode(code, app) {
  var console = debugging;
  /* eslint-enable no-unused-vars */

  try {
    /* eslint-disable no-eval */
    eval(code);
    /* eslint-enable no-eval */
  } catch (err) {
    debugging.error(err);
  }
};

export default executeUnsafeCode;