import { extendObservable } from 'mobx';
import state from '../../state';

const stopReadingModel = function () {
  if (state.debugging.cancelRead) {
    state.debugging.cancelRead();
  }

  extendObservable(state, {
    debugging: {
      selectedReadModelItems: []
    }
  });
};

export default stopReadingModel;
