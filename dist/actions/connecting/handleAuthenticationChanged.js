import state from '../../state';

var handleAuthenticationChanged = function handleAuthenticationChanged(event) {
  state.connecting.useAuthentication = event.target.checked;
};

export default handleAuthenticationChanged;