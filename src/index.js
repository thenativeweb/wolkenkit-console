import App from './App';
import application from './readModel/application';
import { connectToBackend } from './writeModel/backend';
import React from 'react';
import { render } from 'react-dom';
import './index.css';

const token = localStorage.getItem(`id_token_${application.authentication.clientId}`);

if (token) {
  connectToBackend();
}

render(<App />, document.querySelector('#app'));
