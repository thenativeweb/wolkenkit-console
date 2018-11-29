import { set } from 'mobx';
import state from '../../state';

const stopObservingEvents = function () {
  if (state.subscriptions.events) {
    state.subscriptions.events();
    state.subscriptions.events = undefined;
  }

  set(state.watching, {
    collectedEvents: []
  });
};

export default stopObservingEvents;
