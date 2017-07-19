import debugging from '../../readModel/debugging';
import { extendObservable } from 'mobx';

const stopReadingModel = function () {
  if (debugging.cancelRead) {
    debugging.cancelRead();
  }

  extendObservable(debugging, {
    selectedReadModelItems: []
  });
};

export default stopReadingModel;
