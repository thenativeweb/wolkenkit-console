import application from '../../readModel/application';

const changePort = function (event) {
  application.port = event.target.value;
};

export default changePort;
