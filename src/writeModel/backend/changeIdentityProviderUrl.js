import application from '../../readModel/application';

const changeIdentityProviderUrl = function (event) {
  application.authentication.identityProviderUrl = event.target.value;
};

export default changeIdentityProviderUrl;
