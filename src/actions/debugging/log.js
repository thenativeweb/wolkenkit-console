import state from '../../state';

const log = function (...args) {
  state.debugging.messages.push(args[0]);

  /* eslint-disable no-console */
  console.log(...args);
  /* eslint-enable no-console */
};

export default log;
