import application from '../../readModel/application';

const changeHost = function (event) {
  if (!event.target.value) {
    throw new Error('Host is missing.');
  }

  application.host = event.target.value;
};

export default changeHost;
