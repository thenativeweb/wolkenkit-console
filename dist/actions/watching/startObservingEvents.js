import debugging from '../debugging';
import { set } from 'mobx';
import state from '../../state';
import stopObservingEvents from './stopObservingEvents';

var startObservingEvents = function startObservingEvents() {
  stopObservingEvents();
  state.backend.app.events.observe().started(function (cancel) {
    set(state.subscriptions, {
      events: cancel
    });
  }).received(function (event) {
    state.watching.collectedEvents.push(event);
  }).failed(debugging.log);
};

export default startObservingEvents;