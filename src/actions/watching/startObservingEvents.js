import debugging from '../debugging';
import { extendObservable } from 'mobx';
import state from '../../state';
import stopObservingEvents from './stopObservingEvents';

const startObservingEvents = function () {
  stopObservingEvents();

  state.backend.app.events.observe().
    started(cancel => {
      extendObservable(state.subscriptions, { events: cancel });
    }).
    received(event => {
      state.watching.collectedEvents.push(event);
    }).
    failed(debugging.log);
};

export default startObservingEvents;
