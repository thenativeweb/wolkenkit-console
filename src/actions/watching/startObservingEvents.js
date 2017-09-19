import debugging from '../debugging';
import services from '../../services';
import state from '../../state';
import stopObservingEvents from './stopObservingEvents';

const startObservingEvents = function () {
  stopObservingEvents();

  services.backend.events.observe().
    started(cancel => {
      services.subscriptions.events = cancel;
    }).
    received(event => {
      state.watching.collectedEvents.push(event);
    }).
    failed(debugging.log);
};

export default startObservingEvents;
