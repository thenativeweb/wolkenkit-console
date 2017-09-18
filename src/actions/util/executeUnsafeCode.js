import fakeConsole from './fakeConsole';

/* eslint-disable no-unused-vars */
const executeUnsafeCode = function (code, app) {
  const console = fakeConsole;
  /* eslint-enable no-unused-vars */

  try {
    /* eslint-disable no-eval */
    eval(code);
    /* eslint-enable no-eval */
  } catch (err) {
    fakeConsole.error(err);
  }
};

export default executeUnsafeCode;
