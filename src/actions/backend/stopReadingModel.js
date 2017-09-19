import { extendObservable } from 'mobx';
import state from '../../state';

const stopReadingModel = function () {
  if (state.watching.cancelRead) {
    state.watching.cancelRead();
  }

  extendObservable(state.watching, {
    selectedReadModelItems: []
  });
};

export default stopReadingModel;
