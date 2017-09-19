import { extendObservable } from 'mobx';
import { programming } from '../../state/defaults';
import state from '../../state';

const resetState = function () {
  extendObservable(state.programming, programming);
};

export default resetState;
