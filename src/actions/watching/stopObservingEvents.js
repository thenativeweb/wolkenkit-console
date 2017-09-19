import { extendObservable } from 'mobx';
import services from '../../services';
import state from '../../state';

const stopObservingEvents = function () {
  if (services.subscriptions.events) {
    services.subscriptions.events();
    Reflect.deleteProperty(services.subscriptions, 'events');
  }

  extendObservable(state.watching, {
    collectedEvents: []
  });
};

export default stopObservingEvents;
