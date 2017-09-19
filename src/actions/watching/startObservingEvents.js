import debugging from '../debugging';
import { extendObservable } from 'mobx';
import services from '../../services';
import state from '../../state';
import stopObservingEvents from './stopObservingEvents';

const startObservingEvents = function () {
  stopObservingEvents();

  services.backend.events.observe().
    started(cancel => {
      extendObservable(state.subscriptions, { events: cancel });
    }).
    received(event => {
      state.watching.collectedEvents.push(event);
    }).
    failed(debugging.log);
};

export default startObservingEvents;
