import { backend } from '../../state/defaults';
import state from '../../state';

var resetState = function resetState() {
  state.backend = backend;
};

export default resetState;