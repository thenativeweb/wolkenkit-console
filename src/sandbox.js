import fakeConsole from './fakeConsole';
import { startObservingEvents } from './writeModel/backend';
import wolkenkit from 'wolkenkit-client';

let app;

const sandbox = {
  connect ({ host = 'local.wolkenkit.io', port = 3000 }) {
    return new Promise((resolve, reject) => {
      app = wolkenkit.connect({ host, port }).
        then(connectedApp => {
          app = connectedApp;
          startObservingEvents();

          resolve();
        }).
        catch(err => {
          reject(err);
        });
    });
  },

  execute (code) {
    if (!app) {
      fakeConsole.error(new Error('Connect to a wolkenkit app first.'));
    }

    /* eslint-disable no-unused-vars */
    const console = fakeConsole;
    /* eslint-enable no-unused-vars */

    try {
      /* eslint-disable no-eval */
      eval(code);
      /* eslint-enable no-eval */
    } catch (err) {
      /* eslint-disable no-console */
      fakeConsole.error(err);
      /* eslint-enable no-console */
    }
  },

  getApp () {
    return app;
  }
};

export default sandbox;
