import backend from './actions/backend';
import Brand from './components/Brand';
import Button from './components/Button';
import connecting from './actions/connecting';
import ConnectionButton from './components/ConnectionButton';
import Editor from './components/Editor';
import ErrorConsole from './components/ErrorConsole';
import EventConsole from './components/EventConsole';
import Icon from './components/Icon';
import MessageBar from './components/MessageBar';
import { observer } from 'mobx-react';
import programming from './actions/programming';
import React from 'react';
import ReadModelsConsole from './components/ReadModelsConsole';
import Sidebar from './components/Sidebar';
import state from './state';
import Symbols from './components/Symbols';
import Tabs from './components/Tabs';
import View from './components/View';
import './App.css';

const App = function () {
  if (!state.backend) {
    return (
      <div className='wk-app'>
        <View orientation='vertical' size='flex'>
          <View size='flex'>
            <MessageBar type='error' isVisble={ state.connecting.error }>
              { state.connecting.error }
            </MessageBar>
          </View>

          <View orientation='horizontal' size='auto'>
            <Symbols />
            <Sidebar>
              <Brand suffix='console' />
              <Sidebar.Item type='centered'><Icon name='new-connection' /></Sidebar.Item>
            </Sidebar>
            <View orientation='vertical' alignItems='center' justifyContent='center'>
              <h2>Connect to a wolkenkit application</h2>
              <div className='ControlGroup'>
                <input className='TextBox' name='host' value={ state.connecting.host } onChange={ connecting.handleInputChanged } />
                <input className='TextBox TextBox--port' name='port' value={ state.connecting.port } onChange={ connecting.handleInputChanged } />
                <Button className='Button' onClick={ backend.handleConnectClicked } disabled={ !state.connecting.host || !state.connecting.port }>Connect</Button>
              </div>
            </View>
          </View>
        </View>
      </div>
    );
  }

  return (
    <div className='wk-app'>
      <View orientation='vertical'>
        <View size='flex'>
          <MessageBar type='error' isVisble={ state.backend.error }>
            { state.backend.error } <Button onClick={ backend.handleDisconnectClicked }>Disconnect me</Button> <Button onClick={ backend.handleReconnectClicked }>Reconnect me</Button>
          </MessageBar>
        </View>

        <View orientation='horizontal' size='auto'>
          <Symbols />
          <Sidebar>
            <Brand suffix='console' />
            <Sidebar.Item>
              <ConnectionButton onDisconnect={ backend.handleDisconnectClicked } />
            </Sidebar.Item>
          </Sidebar>
          <View id='screen' orientation='vertical'>
            <View orientation='horizontal' size='flex'>
              <View orientation='vertical' size='flex'>
                <View size='flex'>
                  <Editor
                    configuration={ state.backend.configuration }
                    value={ state.programming.code }
                    onInsertCommandClick={ programming.handleInsertCommandClicked }
                    onChange={ programming.handleCodeEdited }
                    onExecute={ programming.handleExecuteCodeClicked }
                  />
                </View>
                <View size='auto'>
                  <ErrorConsole />
                </View>
              </View>
              <View orientation='vertical' size='flex'>
                <Tabs>
                  <EventConsole title='Events' />
                  <ReadModelsConsole title='ReadModels' />
                </Tabs>
              </View>
            </View>
          </View>
        </View>
      </View>
    </div>
  );
};

export default observer(App);
