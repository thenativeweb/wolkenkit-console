import state from '../../state';

const handleChange = function (event) {
  state.connecting[event.target.name] = event.target.value;
};

export default handleChange;
