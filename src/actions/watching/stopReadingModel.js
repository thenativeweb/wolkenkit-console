import { extendObservable } from 'mobx';
import services from '../../services';
import state from '../../state';

const stopReadingModel = function () {
  if (services.subscriptions.model) {
    services.subscriptions.model();
    Reflect.deleteProperty(services.subscriptions, 'model');
  }

  extendObservable(state.watching, {
    selectedReadModelItems: []
  });
};

export default stopReadingModel;
