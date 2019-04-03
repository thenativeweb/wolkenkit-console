import state from '../../state';

var toggleErrorConsole = function toggleErrorConsole() {
  state.debugging.errorConsoleVisible = !state.debugging.errorConsoleVisible;
};

export default toggleErrorConsole;