import App from './App';
import backend from './actions/backend';
import React from 'react';
import { render } from 'react-dom';
import state from './state';
import './index.css';

(async () => {
  if (state.backend) {
    const { host, port } = state.backend;

    await backend.connect({
      host,
      port,
      authentication: {
        identityProviderUrl: state.backend.authentication.identityProviderUrl,
        clientId: state.backend.authentication.clientId,
        scope: state.backend.authentication.scope,
        strictMode: state.backend.authentication.strictMode
      }
    });
  }

  render(<App />, document.querySelector('#app'));
})();
