import state from '../../state';

const clear = function () {
  state.debugging.messages.length = 0;

  /* eslint-disable no-console */
  console.clear();
  /* eslint-enable no-console */
};

export default clear;
