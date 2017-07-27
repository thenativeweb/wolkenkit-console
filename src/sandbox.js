import fakeConsole from './fakeConsole';
import wolkenkit from 'wolkenkit-client';

let app;

const sandbox = {
  connect ({ host = 'local.wolkenkit.io', port = 3000, authentication = undefined }) {
    return new Promise((resolve, reject) => {
      const options = { host, port };

      if (authentication) {
        options.authentication = new wolkenkit.authentication.OpenIdConnect(authentication);
      }

      app = wolkenkit.connect(options).
        then(connectedApp => {
          app = connectedApp;

          if (authentication && !app.auth.isLoggedIn()) {
            app.auth.login();

            return;
          }

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
