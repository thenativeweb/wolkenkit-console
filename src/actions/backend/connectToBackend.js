import { extendObservable } from 'mobx';
import loadConfiguration from '../util/loadConfiguration';
import services from '../../services';
import startObservingEvents from './startObservingEvents';
import state from '../../state';
import wolkenkit from 'wolkenkit-client';

const connectToBackend = function () {
  if (!state.backend.host) {
    throw new Error('Host is missing.');
  }
  if (!state.backend.port) {
    throw new Error('Port is missing.');
  }

  const { host, port, authentication } = state.backend;

  loadConfiguration({ host, port }).
    then(configuration => {
      extendObservable(state.backend, { configuration });

      const options = { host, port };

      if (authentication.identityProviderUrl && authentication.clientId) {
        options.authentication = new wolkenkit.authentication.OpenIdConnect(authentication);
      }

      return wolkenkit.connect(options);
    }).
    then(backend => {
      services.backend = backend;

      if (authentication.identityProviderUrl && authentication.clientId && !backend.auth.isLoggedIn()) {
        return backend.auth.login();
      }

      extendObservable(state.backend, {
        tryToConnect: true,
        isBackendReachable: true
      });

      // Commented, because the connected event didn't work reliably. We should
      // have another look at this in the future.
      // app.on('connected', () => {
      //   state.backend.isBackendReachable = true;
      // });

      backend.on('disconnected', () => {
        state.backend.isBackendReachable = false;
      });

      startObservingEvents();
    }).
    catch(() => {
      state.backend.isBackendReachable = false;
    });
};

export default connectToBackend;
