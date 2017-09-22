import { debugging } from '../../state/defaults';
import { extendObservable } from 'mobx';
import state from '../../state';

const resetState = function () {
  extendObservable(state.debugging, debugging);
};

export default resetState;
