import debugging from '../../readModel/debugging';
import { extendObservable } from 'mobx';

const stopObservingEvents = function () {
  if (debugging.cancelEvents) {
    debugging.cancelEvents();
  }

  extendObservable(debugging, {
    collectedEvents: []
  });
};

export default stopObservingEvents;
