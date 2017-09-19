import { extendObservable } from 'mobx';
import state from '../../state';

const stopObservingEvents = function () {
  if (state.debugging.cancelEvents) {
    state.debugging.cancelEvents();
  }

  extendObservable(state.debugging, {
    collectedEvents: []
  });
};

export default stopObservingEvents;
