import application from '../../readModel/application';
import loadConfiguration from '../../loadConfiguration';
import sandbox from '../../sandbox';
import startObservingEvents from './startObservingEvents';
import { extendObservable, runInAction } from 'mobx';

const connectToBackend = function () {
  const { host, port, isConnected } = application;

  if (!application.host) {
    throw new Error('Host is missing.');
  }
  if (!application.port) {
    throw new Error('Port is missing.');
  }
  if (isConnected) {
    throw new Error('Already connected to application.');
  }

  let configuration;

  loadConfiguration({
    host,
    port
  }).
    then(loadedConfiguration => {
      configuration = loadedConfiguration;

      return sandbox.connect({ host, port });
    }).
    then(() => {
      runInAction(() => {
        application.isConnected = true;
        extendObservable(application, {
          configuration
        });
      });

      startObservingEvents();
    }).
    catch(() => {
      /* eslint-disable no-alert */
      alert('Could not load wolkenkit configuration. Is the backend running?');
      /* eslint-enable no-alert */
    });
};

export default connectToBackend;
