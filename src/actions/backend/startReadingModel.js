import fakeConsole from '../util/fakeConsole';
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
    state.debugging.selectedReadModel = modelName;

    if (modelName === 'none') {
      return;
    }

    services.backend.lists[modelName].readAndObserve().
      started((items, cancel) => {
        state.debugging.cancelRead = cancel;

        extendObservable(state.debugging, {
          selectedReadModelItems: items
        });
      }).
      updated(items => {
        extendObservable(state.debugging, {
          selectedReadModelItems: items
        });
      }).
      failed(fakeConsole.log);
  });
};

export default startReadingModel;
