import application from '../../readModel/application';

const changeStrictMode = function (event) {
  application.authentication.strictMode = event.target.checked;
};

export default changeStrictMode;
