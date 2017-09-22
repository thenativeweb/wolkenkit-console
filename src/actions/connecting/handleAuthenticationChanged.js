import state from '../../state';

const handleAuthenticationChanged = function (event) {
  state.connecting.useAuthentication = event.target.checked;
};

export default handleAuthenticationChanged;
