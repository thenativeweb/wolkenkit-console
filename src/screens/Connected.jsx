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
        <Sidebar.Item iconName='active-connection'>
          <Sidebar.Item>
            {state.backend.user ? `Authenticated as ${state.backend.user.name || state.backend.user.nickname || 'unnamed user'} (${state.backend.user.sub})` : 'Not authenticated (anonymous)'}
          </Sidebar.Item>
          <Sidebar.Item onClick={ backend.handleDisconnectClicked }>Disconnect</Sidebar.Item>
        </Sidebar.Item>
      </Sidebar>
      <View orientation='vertical' adjust='flex' style={{ overflow: 'hidden' }}>
        <View orientation='horizontal' adjust='flex' style={{ overflow: 'hidden' }}>
          <View orientation='vertical' adjust='flex' style={{ overflow: 'hidden', maxWidth: 700 }}>
            <View adjust='flex'>
              <Editor
                configuration={ state.backend.configuration }
                value={ state.programming.code }
                onChange={ programming.handleCodeEdited }
                onExecute={ programming.handleExecuteCodeClicked }
              />
            </View>
          </View>
          <View orientation='vertical' adjust='flex' style={{ overflow: 'hidden' }}>
            <Tabs>
              <EventConsole title={ `Events (${state.watching.collectedEvents.length})` } />
              <ReadModelConsole title='ReadModels' />
            </Tabs>
          </View>
        </View>
        <View adjust='auto'>
          <ErrorConsole />
        </View>
      </View>
    </React.Fragment>
  );
};

export default observer(Connected);
