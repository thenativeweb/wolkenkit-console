import loadConfiguration from '../util/loadConfiguration';
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
  if (options.authentication) {
    if (options.authentication.identityProviderUrl && !options.authentication.clientId) {
      throw new Error('Client ID is missing.');
    }
    if (!options.authentication.identityProviderUrl && options.authentication.clientId) {
      throw new Error('Identity provider URL is missing.');
    }
  }

  const { host, port } = options;

  const authentication = options.authentication || {};
  const isAuthenticationEnabled = authentication.identityProviderUrl && authentication.clientId;

  let app,
      configuration;

  try {
    configuration = await loadConfiguration({ host, port });
  } catch (ex) {
    state.connecting.error = 'Failed to connect, is the backend running?';

    return;
  }

  let authProvider;

  if (isAuthenticationEnabled) {
    authProvider = new wolkenkit.authentication.OpenIdConnect(authentication);
  }

  try {
    app = await wolkenkit.connect({ host, port, authentication: authProvider });
  } catch (ex) {
    state.connecting.error = 'Failed to connect, is the backend running?';

    return;
  }

  runInAction(() => {
    state.backend = {};

    extendObservable(state.backend, {
      app,
      host,
      port,
      configuration,
      authentication,
      error: undefined
    });
  });

  if (isAuthenticationEnabled && !app.auth.isLoggedIn()) {
    return app.auth.login();
  }

  // Commented, because the connected event didn't work reliably. We should
  // have another look at this in the future.
  // app.on('connected', () => {
  //   state.backend.isReachable = true;
  // });

  app.on('disconnected', () => {
    state.backend.error = 'Lost connection, is the backend running?';
  });

  watching.startObservingEvents();
};

export default connect;
