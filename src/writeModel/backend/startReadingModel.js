import debugging from '../../readModel/debugging';
import fakeConsole from '../../fakeConsole';
import sandbox from '../../sandbox';
import stopReadingModel from './stopReadingModel';
import { extendObservable, runInAction } from 'mobx';

const startReadingModel = function (modelName) {
  if (!modelName) {
    throw new Error('Model name is missing.');
  }

  stopReadingModel();

  runInAction(() => {
    debugging.selectedReadModel = modelName;

    if (modelName === 'none') {
      return;
    }

    sandbox.getApp().lists[modelName].readAndObserve().
      started((items, cancel) => {
        debugging.cancelRead = cancel;

        extendObservable(debugging, {
          selectedReadModelItems: items
        });
      }).
      updated(items => {
        extendObservable(debugging, {
          selectedReadModelItems: items
        });
      }).
      failed(fakeConsole.log);
  });
};

export default startReadingModel;
