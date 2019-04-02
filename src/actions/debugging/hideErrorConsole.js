import state from '../../state';

const hideErrorConsole = function () {
  state.debugging.errorConsoleVisible = false;
};

export default hideErrorConsole;
