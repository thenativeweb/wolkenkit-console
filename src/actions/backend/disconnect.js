import connecting from '../connecting';
import debugging from '../debugging';
import programming from '../programming';
import resetState from './resetState';
import state from '../../state';
import stopObservingEvents from '../watching/stopObservingEvents';
import watching from '../watching';
import wolkenkit from 'wolkenkit-client';

const disconnect = function () {
  stopObservingEvents();

  const app = state.backend.app;

  if (app) {
    if (state.connecting.useAuthentication && state.backend.authentication && state.backend.authentication.clientId) {
      app.auth.logout();
    }

    app.removeAllListeners('connected');
    app.removeAllListeners('disconnected');
  }

  // Undocumented SDK function that resets the internal application cache.
  wolkenkit.reset();

  resetState();
  connecting.resetState();
  debugging.resetState();
  programming.resetState();
  watching.resetState();
};

export default disconnect;
