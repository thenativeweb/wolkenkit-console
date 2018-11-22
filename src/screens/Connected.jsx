import backend from '../actions/backend';
import Editor from '../components/Editor';
import ErrorConsole from '../components/ErrorConsole';
import EventConsole from '../components/EventConsole';
import { observer } from 'mobx-react';
import programming from '../actions/programming';
import React from 'react';
import ReadModelConsole from '../components/ReadModelConsole';
import state from '../state';
import Tabs from '../components/Tabs';
import {
  Product,
  Sidebar,
  View
} from 'thenativeweb-ux';

const Connected = function () {
  return (
    <React.Fragment>
      <Sidebar>
        <Sidebar.Brand><Product name='console' /></Sidebar.Brand>
        <Sidebar.Item iconName='account'>
          <Sidebar.Item>
            {state.backend.user ? `Authenticated as ${state.backend.user.name || state.backend.user.nickname || 'unnamed user'} (${state.backend.user.sub})` : 'Not authenticated (anonymous)'}
          </Sidebar.Item>
          <Sidebar.Item onClick={ backend.handleDisconnectClicked }>Disconnect</Sidebar.Item>
        </Sidebar.Item>
      </Sidebar>
      <View orientation='horizontal' adjust='flex'>
        <View orientation='vertical' adjust='flex'>
          <View adjust='flex'>
            <Editor
              configuration={ state.backend.configuration }
              value={ state.programming.code }
              onInsertCommandClick={ programming.handleInsertCommandClicked }
              onChange={ programming.handleCodeEdited }
              onExecute={ programming.handleExecuteCodeClicked }
            />
          </View>
          <View adjust='auto'>
            <ErrorConsole />
          </View>
        </View>
        <View orientation='vertical' adjust='flex'>
          <Tabs>
            <EventConsole title='Events' />
            <ReadModelConsole title='ReadModels' />
          </Tabs>
        </View>
      </View>
    </React.Fragment>
  );
};

export default observer(Connected);
