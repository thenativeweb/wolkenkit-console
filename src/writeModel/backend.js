import application from '../readModel/application';
import debugging from '../readModel/debugging';
import fakeConsole from '../fakeConsole';
import loadConfiguration from '../loadConfiguration';
import sandbox from '../sandbox';
import { extendObservable, runInAction } from 'mobx';

const changeHost = function (event) {
  if (!event.target.value) {
    throw new Error('Host is missing.');
  }

  application.host = event.target.value;
};

const changePort = function (event) {
  if (!event.target.value) {
    throw new Error('Port is missing.');
  }

  application.port = event.target.value;
};

const connectToBackend = function () {
  const { host, port, isConnected } = application;

  if (!application.host) {
    throw new Error('Host is missing.');
  }
  if (!application.port) {
    throw new Error('Port is missing.');
  }
  if (isConnected) {
    throw new Error('Already connected to application.');
  }

  let configuration;

  loadConfiguration({
    host,
    port
  }).
    then(loadedConfiguration => {
      configuration = loadedConfiguration;

      return sandbox.connect({ host, port });
    }).
    then(() => {
      runInAction(() => {
        application.isConnected = true;
        extendObservable(application, {
          configuration
        });
      });
    }).
    catch(() => {
      /* eslint-disable no-alert */
      alert('Could not load wolkenkit configuration. Is the backend running?');
      /* eslint-enable no-alert */
    });
};

const resetReadModel = function () {
  debugging.selectedReadModel = 'none';
};

const stopReadingModel = function () {
  if (debugging.cancelRead) {
    debugging.cancelRead();
  }

  extendObservable(debugging, {
    selectedReadModelItems: []
  });
};

const startReadingModel = function (modelName) {
  if (!modelName) {
    throw new Error('Model name is missing.');
  }

  runInAction(() => {
    stopReadingModel();

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

const stopObservingEvents = function () {
  if (debugging.cancelEvents) {
    debugging.cancelEvents();
  }

  extendObservable(debugging, {
    collectedEvents: []
  });
};

const startObservingEvents = function () {
  stopObservingEvents();

  sandbox.getApp().events.observe().
    started(cancel => {
      debugging.cancelEvents = cancel;
    }).
    received(event => {
      debugging.collectedEvents.push(event);
    }).
    failed(fakeConsole.log);
};

export {
  changeHost,
  changePort,
  connectToBackend,
  resetReadModel,
  startObservingEvents,
  stopObservingEvents,
  startReadingModel,
  stopReadingModel
};
