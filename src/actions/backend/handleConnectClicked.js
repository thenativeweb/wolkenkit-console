import connect from './connect';
import state from '../../state';

const handleConnectClicked = function () {
  (async () => {
    await connect({
      host: state.connecting.host,
      port: state.connecting.port
    });
  })();
};

export default handleConnectClicked;
