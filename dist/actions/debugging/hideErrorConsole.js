import state from '../../state';

var hideErrorConsole = function hideErrorConsole() {
  state.debugging.errorConsoleVisible = false;
};

export default hideErrorConsole;