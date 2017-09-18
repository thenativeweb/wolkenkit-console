import { extendObservable } from 'mobx';
import services from '../../services';
import state from '../../state';
import stopObservingEvents from './stopObservingEvents';
import wolkenkit from 'wolkenkit-client';

const disconnectFromBackend = function () {
  stopObservingEvents();

  const { backend } = services;

  if (backend) {
    if (state.backend.authentication && state.backend.authentication.clientId) {
      backend.auth.logout();
    }

    backend.removeEventListener('connected');
    backend.removeEventListener('disconnected');
  }

  // Undocumented sdk function that resets the internal application cache.
  wolkenkit.reset();

  extendObservable(state, {
    backend: {
      configuration: undefined,
      tryToConnect: false,
      isBackendReachable: null
    }
  });
};

export default disconnectFromBackend;
