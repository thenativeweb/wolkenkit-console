import executeCode from './executeCode';
import state from '../../state';

var handleExecuteCodeClicked = function handleExecuteCodeClicked() {
  executeCode(state.programming.code);
};

export default handleExecuteCodeClicked;