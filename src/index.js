import App from './App';
import application from './readModel/application';
import { connectToBackend } from './writeModel/backend';
import React from 'react';
import { render } from 'react-dom';
import './index.css';

if (application.tryToConnect) {
  connectToBackend();
}

render(<App />, document.querySelector('#app'));
