import state from '../../state';

var error = function error() {
  var _console;

  state.debugging.messages.push(arguments.length <= 0 ? undefined : arguments[0]);
  /* eslint-disable no-console */

  (_console = console).error.apply(_console, arguments);
  /* eslint-enable no-console */

};

export default error;