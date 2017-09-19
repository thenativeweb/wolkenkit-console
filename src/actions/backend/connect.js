import loadConfiguration from '../util/loadConfiguration';
import services from '../../services';
import state from '../../state';
import watching from '../watching';
import wolkenkit from 'wolkenkit-client';
import { extendObservable, runInAction } from 'mobx';

const connect = async function (options) {
  if (!options.host) {
    throw new Error('Host is missing.');
  }
  if (!options.port) {
    throw new Error('Port is missing.');
  }

  const { host, port } = options;

  let backend,
      configuration;

  try {
    configuration = await loadConfiguration({ host, port });
  } catch (ex) {
    state.connecting.error = 'Failed to connect, is the backend running?';

    return;
  }

  // if (authentication.identityProviderUrl && authentication.clientId) {
  //   options.authentication = new wolkenkit.authentication.OpenIdConnect(authentication);
  // }

  try {
    backend = await wolkenkit.connect(options);
  } catch (ex) {
    state.connecting.error = 'Failed to connect, is the backend running?';

    return;
  }

  services.backend = backend;

  // if (authentication.identityProviderUrl && authentication.clientId && !backend.auth.isLoggedIn()) {
  //   return backend.auth.login();
  // }

  runInAction(() => {
    state.backend = {};

    extendObservable(state.backend, {
      host,
      port,
      configuration,
      error: undefined
    });
  });

  // Commented, because the connected event didn't work reliably. We should
  // have another look at this in the future.
  // app.on('connected', () => {
  //   state.backend.isReachable = true;
  // });

  backend.on('disconnected', () => {
    state.backend.error = 'Lost connection, is the backend running?';
  });

  watching.startObservingEvents();
};

export default connect;
