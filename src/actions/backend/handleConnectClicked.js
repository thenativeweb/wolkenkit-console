import connect from './connect';
import state from '../../state';

const handleConnectClicked = function () {
  (async () => {
    await connect({
      host: state.connecting.host,
      port: state.connecting.port,
      authentication: {
        identityProviderUrl: state.connecting.authentication.identityProviderUrl,
        clientId: state.connecting.authentication.clientId,
        scope: state.connecting.authentication.scope,
        strictMode: state.connecting.authentication.strictMode
      }
    });
  })();
};

export default handleConnectClicked;
