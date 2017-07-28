import application from '../../readModel/application';
import { extendObservable } from 'mobx';
import sandbox from '../../sandbox';
import stopObservingEvents from './stopObservingEvents';

const disconnectFromBackend = function () {
  stopObservingEvents();

  sandbox.disconnect(application);

  extendObservable(application, {
    configuration: undefined
  });
  application.isConnected = false;
};

export default disconnectFromBackend;
