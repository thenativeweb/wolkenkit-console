import { set } from 'mobx';
import state from '../../state';

var stopObservingEvents = function stopObservingEvents() {
  if (state.subscriptions.events) {
    state.subscriptions.events();
    state.subscriptions.events = undefined;
  }

  set(state.watching, {
    collectedEvents: []
  });
};

export default stopObservingEvents;