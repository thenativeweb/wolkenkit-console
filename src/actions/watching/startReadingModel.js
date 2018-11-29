import debugging from '../debugging';
import state from '../../state';
import stopReadingModel from './stopReadingModel';
import { runInAction, set } from 'mobx';

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

    state.backend.app.lists[modelName].readAndObserve().
      started((items, cancel) => {
        set(state.subscriptions, { model: cancel });
        set(state.watching, { selectedReadModelItems: items });
      }).
      updated(items => {
        set(state.watching, { selectedReadModelItems: items });
      }).
      failed(debugging.log);
  });
};

export default startReadingModel;
