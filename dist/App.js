import backend from './actions/backend';
import Connect from './screens/Connect.jsx';
import Connected from './screens/Connected.jsx';
import get from 'lodash/get';
import { observer } from 'mobx-react';
import React from 'react';
import state from './state';
import Symbols from './components/Symbols';
import { Application, Button, Headline, Message, Modal, ThemeProvider, View } from 'thenativeweb-ux';

var renderScreen = function renderScreen() {
  if (!state.backend || !state.backend.isConnected) {
    return React.createElement(Connect, null);
  }

  return React.createElement(Connected, null);
};

var App = function App() {
  return React.createElement(ThemeProvider, {
    theme: "wolkenkit"
  }, React.createElement(Application, null, React.createElement(Application.Services, null), React.createElement(Symbols, null), renderScreen(), React.createElement(Modal, {
    showHeader: false,
    isVisible: get(state, 'backend.error') !== undefined
  }, React.createElement(Headline, null, "Oops!"), React.createElement(Message, {
    type: "error"
  }, get(state, 'backend.error')), React.createElement(View, {
    orientation: "vertical"
  }, React.createElement(Button, {
    isPrimary: true,
    onClick: backend.handleReconnectClicked
  }, "Reconnect me!"), React.createElement(Button, {
    isPrimary: true,
    onClick: backend.handleDisconnectClicked
  }, "Reset connection!")))));
};

export default observer(App);