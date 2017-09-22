import executeCode from './executeCode';
import state from '../../state';

const handleExecuteCodeClicked = function () {
  executeCode(state.programming.code);
};

export default handleExecuteCodeClicked;
