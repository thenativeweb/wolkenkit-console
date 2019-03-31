import state from '../../state';

const toggleErrorConsole = function () {
  state.debugging.errorConsoleVisible = !state.debugging.errorConsoleVisible;
};

export default toggleErrorConsole;
