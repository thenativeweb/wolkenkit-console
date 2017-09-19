import debugging from '../debugging';
import services from '../../services';
import state from '../../state';
import stopReadingModel from './stopReadingModel';
import { extendObservable, runInAction } from 'mobx';

const startReadingModel = function (modelName) {
  if (!modelName) {
    throw new Error('Model name is missing.');
  }

  stopReadingModel();

  runInAction(() => {
    state.watching.selectedReadModel = modelName;

    if (modelName === 'none') {
      return;
    }

    services.backend.lists[modelName].readAndObserve().
      started((items, cancel) => {
        state.watching.cancelRead = cancel;

        extendObservable(state.watching, {
          selectedReadModelItems: items
        });
      }).
      updated(items => {
        extendObservable(state.watching, {
          selectedReadModelItems: items
        });
      }).
      failed(debugging.log);
  });
};

export default startReadingModel;
