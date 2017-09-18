import state from '../../state';

const changeIdentityProviderUrl = function (event) {
  state.backend.authentication.identityProviderUrl = event.target.value;
};

export default changeIdentityProviderUrl;
