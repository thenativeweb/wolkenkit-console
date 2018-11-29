import { set } from 'mobx';
import state from '../../state';
import { watching } from '../../state/defaults';

var resetState = function resetState() {
  set(state.watching, watching);
};

export default resetState;