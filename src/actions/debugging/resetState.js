import { debugging } from '../../state/defaults';
import { set } from 'mobx';
import state from '../../state';

const resetState = function () {
  set(state.debugging, debugging);
};

export default resetState;
