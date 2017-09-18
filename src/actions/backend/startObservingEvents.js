import fakeConsole from '../util/fakeConsole';
import services from '../../services';
import state from '../../state';
import stopObservingEvents from './stopObservingEvents';

const startObservingEvents = function () {
  stopObservingEvents();

  services.backend.events.observe().
    started(cancel => {
      state.debugging.cancelEvents = cancel;
    }).
    received(event => {
      state.debugging.collectedEvents.push(event);
    }).
    failed(fakeConsole.log);
};

export default startObservingEvents;
