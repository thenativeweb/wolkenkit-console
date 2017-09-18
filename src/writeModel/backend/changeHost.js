import application from '../../readModel/application';

const changeHost = function (event) {
  application.host = event.target.value;
};

export default changeHost;
