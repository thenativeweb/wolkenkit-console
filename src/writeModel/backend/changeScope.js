import application from '../../readModel/application';

const changeScope = function (event) {
  application.authentication.scope = event.target.value;
};

export default changeScope;
