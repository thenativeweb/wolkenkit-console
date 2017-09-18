import state from '../../state';

const changeHost = function (event) {
  state.backend.host = event.target.value;
};

export default changeHost;
