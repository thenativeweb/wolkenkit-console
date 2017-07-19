import application from '../../readModel/application';

const changePort = function (event) {
  if (!event.target.value) {
    throw new Error('Port is missing.');
  }

  application.port = event.target.value;
};

export default changePort;
