import { set } from 'mobx';
import state from '../../state';
import { watching } from '../../state/defaults';

const resetState = function () {
  set(state.watching, watching);
};

export default resetState;
