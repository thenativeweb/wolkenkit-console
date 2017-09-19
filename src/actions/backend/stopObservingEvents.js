import { extendObservable } from 'mobx';
import state from '../../state';

const stopObservingEvents = function () {
  if (state.watching.cancelEvents) {
    state.watching.cancelEvents();
  }

  extendObservable(state.watching, {
    collectedEvents: []
  });
};

export default stopObservingEvents;
