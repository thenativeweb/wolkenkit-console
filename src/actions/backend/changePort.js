import state from '../../state';

const changePort = function (event) {
  state.backend.port = event.target.value;
};

export default changePort;
