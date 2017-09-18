import { extendObservable } from 'mobx';

const fakeConsole = {};

extendObservable(fakeConsole, {
  messages: []
});

fakeConsole.log = function (...args) {
  fakeConsole.messages.push(args[0]);

  /* eslint-disable no-console */
  console.log(...args);
  /* eslint-enable no-console */
};

fakeConsole.error = function (...args) {
  fakeConsole.messages.push(args[0]);

  /* eslint-disable no-console*/
  console.error(...args);
  /* eslint-enable no-console */
};

fakeConsole.clear = function () {
  fakeConsole.messages.length = 0;
};

export default fakeConsole;
