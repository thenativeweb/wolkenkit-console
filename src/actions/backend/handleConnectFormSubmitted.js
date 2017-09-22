import connect from './connect';
import state from '../../state';

const handleConnectFormSubmitted = function (event) {
  event.preventDefault();

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

    await connect(options);
  })();
};

export default handleConnectFormSubmitted;
