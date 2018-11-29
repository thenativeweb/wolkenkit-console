import { programming } from '../../state/defaults';
import { set } from 'mobx';
import state from '../../state';

var resetState = function resetState() {
  set(state.programming, programming);
};

export default resetState;