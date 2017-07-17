import { extendObservable } from 'mobx';

const fakeConsole = {};

extendObservable(fakeConsole, {
  messages: []
});

fakeConsole.log = function (message) {
  fakeConsole.messages.push(message);

  /* eslint-disable no-console, prefer-reflect, prefer-rest-params, prefer-spread */
  console.log.apply(console, arguments);
  /* eslint-enable no-console, prefer-reflect, prefer-rest-params, prefer-spread  */
};

fakeConsole.error = function (error) {
  fakeConsole.messages.push(error);

  /* eslint-disable no-console, prefer-reflect, prefer-rest-params, prefer-spread */
  console.error.apply(console, arguments);
  /* eslint-enable no-console, prefer-reflect, prefer-rest-params, prefer-spread  */
};

fakeConsole.clear = function () {
  fakeConsole.messages.length = 0;
};

export default fakeConsole;
