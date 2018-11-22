import App from './App';
import backend from './actions/backend';
import React from 'react';
import { render } from 'react-dom';
import state from './state';

(async () => {
  if (state.backend) {
    const { host, port, authentication } = state.backend;

    await backend.connect({
      host,
      port,
      authentication
    });
  }

  render(<App />, document.querySelector('#root'));
})();
