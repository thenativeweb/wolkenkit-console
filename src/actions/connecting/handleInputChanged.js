import set from 'lodash/set';
import state from '../../state';

const handleChange = function (event) {
  switch (event.target.type) {
    case 'checkbox':
      set(state.connecting, event.target.name, event.target.checked);
      break;
    default:
      set(state.connecting, event.target.name, event.target.value);
  }
};

export default handleChange;
