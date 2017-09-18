import application from '../../readModel/application';
import loadConfiguration from '../../loadConfiguration';
import sandbox from '../../sandbox';
import startObservingEvents from './startObservingEvents';
import { extendObservable, runInAction } from 'mobx';

const connectToBackend = function () {
  const { host, port, authentication } = application;

  if (!application.host) {
    throw new Error('Host is missing.');
  }
  if (!application.port) {
    throw new Error('Port is missing.');
  }

  let configuration;

  loadConfiguration({
    host,
    port
  }).
    then(loadedConfiguration => {
      configuration = loadedConfiguration;

      const options = { host, port };

      if (authentication.identityProviderUrl && authentication.clientId) {
        options.authentication = authentication;
      }

      return sandbox.connect(options);
    }).
    then(() => {
      runInAction(() => {
        extendObservable(application, {
          configuration,
          tryToConnect: true,
          isBackendReachable: true
        });
      });

      const app = sandbox.getApp();

      // Commented, because the connected event didn't work reliably. We should
      // have another look at this in the future.
      // app.on('connected', () => {
      //   application.isBackendReachable = true;
      // });

      app.on('disconnected', () => {
        application.isBackendReachable = false;
      });

      startObservingEvents();
    }).
    catch(() => {
      runInAction(() => {
        extendObservable(application, {
          isBackendReachable: false
        });
      });
    });
};

export default connectToBackend;
