import application from '../../readModel/application';

const changeClientId = function (event) {
  application.authentication.clientId = event.target.value;
};

export default changeClientId;
