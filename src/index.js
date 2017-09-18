import App from './App';
import { connectToBackend } from './actions/backend';
import React from 'react';
import { render } from 'react-dom';
import state from './state';
import './index.css';

if (state.backend.tryToConnect) {
  connectToBackend();
}

render(<App />, document.querySelector('#app'));
