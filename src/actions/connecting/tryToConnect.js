import backend from '../backend';
import state from '../../state';

const tryToConnect = function () {
  state.connecting.shouldAutoConnect = true;

  (async () => {
    const options = {
      host: state.connecting.host,
      port: state.connecting.port
    };

    if (state.connecting.useAuthentication) {
      options.authentication = {
        identityProviderUrl: state.connecting.authentication.identityProviderUrl,
        clientId: state.connecting.authentication.clientId,
        scope: state.connecting.authentication.scope,
        strictMode: state.connecting.authentication.strictMode
      };
    }

    await backend.connect(options);
  })();
};

export default tryToConnect;
