import debugging from '../../readModel/debugging';
import fakeConsole from '../../fakeConsole';
import sandbox from '../../sandbox';
import stopObservingEvents from './stopObservingEvents';

const startObservingEvents = function () {
  stopObservingEvents();

  sandbox.getApp().events.observe().
    started(cancel => {
      debugging.cancelEvents = cancel;
    }).
    received(event => {
      debugging.collectedEvents.push(event);
    }).
    failed(fakeConsole.log);
};

export default startObservingEvents;
