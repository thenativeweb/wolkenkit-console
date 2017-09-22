import { backend } from '../../state/defaults';
import state from '../../state';

const resetState = function () {
  state.backend = backend;
};

export default resetState;
