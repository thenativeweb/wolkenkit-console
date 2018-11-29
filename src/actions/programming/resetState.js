import { programming } from '../../state/defaults';
import { set } from 'mobx';
import state from '../../state';

const resetState = function () {
  set(state.programming, programming);
};

export default resetState;
