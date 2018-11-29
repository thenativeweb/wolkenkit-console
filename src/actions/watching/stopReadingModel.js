import { set } from 'mobx';
import state from '../../state';

const stopReadingModel = function () {
  if (state.subscriptions.model) {
    state.subscriptions.model();
    state.subscriptions.model = undefined;
  }

  set(state.watching, {
    selectedReadModelItems: []
  });
};

export default stopReadingModel;
