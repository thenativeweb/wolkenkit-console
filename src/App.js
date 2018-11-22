import backend from './actions/backend';
import Connect from './screens/Connect.jsx';
import Connected from './screens/Connected.jsx';
import get from 'lodash/get';
import { observer } from 'mobx-react';
import React from 'react';
import state from './state';
import {
  Application,
  Button,
  Headline,
  Message,
  Modal,
  ThemeProvider
} from 'thenativeweb-ux';

const renderScreen = function () {
  if (!state.backend || !state.backend.isConnected) {
    return <Connect />;
  }

  return <Connected />;
};

const App = function () {
  return (
    <ThemeProvider theme='wolkenkit'>
      <Application>
        <Application.Services />
        { renderScreen() }

        <Modal isVisible={ get(state, 'backend.error') !== undefined }>
          <Headline>
            Oops!
          </Headline>
          <Message type='error'>
            { get(state, 'backend.error') }
          </Message>
          <Button
            isPrimary={ true }
            onClick={ backend.handleReconnectClicked }
          >
            Reconnect me!
          </Button>
          <Button
            isPrimary={ true }
            onClick={ backend.handleDisconnectClicked }
          >
            Reset connection!
          </Button>
        </Modal>
      </Application>
    </ThemeProvider>
  );
};

export default observer(App);
