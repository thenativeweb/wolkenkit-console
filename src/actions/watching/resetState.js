import { extendObservable } from 'mobx';
import state from '../../state';
import { watching } from '../../state/defaults';

const resetState = function () {
  extendObservable(state.watching, watching);
};

export default resetState;
