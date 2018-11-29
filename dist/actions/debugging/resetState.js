import { debugging } from '../../state/defaults';
import { set } from 'mobx';
import state from '../../state';

var resetState = function resetState() {
  set(state.debugging, debugging);
};

export default resetState;