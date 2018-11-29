import debugging from '../debugging';
import state from '../../state';
import stopReadingModel from './stopReadingModel';
import { runInAction, set } from 'mobx';

var startReadingModel = function startReadingModel(modelName) {
  if (!modelName) {
    throw new Error('Model name is missing.');
  }

  stopReadingModel();
  runInAction(function () {
    state.watching.selectedReadModel = modelName;

    if (modelName === 'none') {
      return;
    }

    state.backend.app.lists[modelName].readAndObserve().started(function (items, cancel) {
      set(state.subscriptions, {
        model: cancel
      });
      set(state.watching, {
        selectedReadModelItems: items
      });
    }).updated(function (items) {
      set(state.watching, {
        selectedReadModelItems: items
      });
    }).failed(debugging.log);
  });
};

export default startReadingModel;