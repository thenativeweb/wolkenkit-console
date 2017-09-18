import state from '../../state';

const changeClientId = function (event) {
  state.backend.authentication.clientId = event.target.value;
};

export default changeClientId;
