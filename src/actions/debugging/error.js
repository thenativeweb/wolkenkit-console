import state from '../../state';

const error = function (...args) {
  state.debugging.messages.push(args[0]);

  /* eslint-disable no-console */
  console.error(...args);
  /* eslint-enable no-console */
};

export default error;
