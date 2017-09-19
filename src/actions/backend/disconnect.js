import connecting from '../connecting';
import debugging from '../debugging';
import programming from '../programming';
import resetState from './resetState';
import services from '../../services';
import state from '../../state';
import stopObservingEvents from '../watching/stopObservingEvents';
import watching from '../watching';
import wolkenkit from 'wolkenkit-client';

const disconnect = function () {
  stopObservingEvents();

  const { backend } = services;

  if (backend) {
    if (state.backend.authentication && state.backend.authentication.clientId) {
      backend.auth.logout();
    }

    backend.removeAllListeners('connected');
    backend.removeAllListeners('disconnected');
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
