import { extendObservable } from 'mobx';
import state from '../../state';

const stopReadingModel = function () {
  if (state.subscriptions.model) {
    state.subscriptions.model();
    state.subscriptions.model = undefined;
  }

  extendObservable(state.watching, {
    selectedReadModelItems: []
  });
};

export default stopReadingModel;
