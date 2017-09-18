import Brand from './components/Brand';
import Button from './components/Button';
import ConnectionButton from './components/ConnectionButton';
import Editor from './components/Editor';
import ErrorConsole from './components/ErrorConsole';
import EventConsole from './components/EventConsole';
import Icon from './components/Icon';
import MessageBar from './components/MessageBar';
import { observer } from 'mobx-react';
import React from 'react';
import ReadModelsConsole from './components/ReadModelsConsole';
import Sidebar from './components/Sidebar';
import state from './state';
import Symbols from './components/Symbols';
import Tabs from './components/Tabs';
import View from './components/View';
import { changeClientId, changeHost, changeIdentityProviderUrl, changePort, changeScope, changeStrictMode, connectToBackend, disconnectFromBackend } from './actions/backend';
import { editCode, executeCode, insertCommand } from './actions/programming';
import './App.css';

const App = function () {
  if (!state.backend.tryToConnect) {
    return (
      <div className='wk-app'>
        <View orientation='vertical' size='flex'>
          <View size='flex'>
            {

              // We explicitly check for false here, as the value null is also allowed
              // and has a different meaning than false.
            }
            <MessageBar type='error' isVisble={ state.backend.isBackendReachable === false }>
              The backend is not reachable, is it running?
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
                <input className='TextBox' value={ state.backend.host } onChange={ changeHost } />
                <input className='TextBox TextBox--port' value={ state.backend.port } onChange={ changePort } />
                <Button className='Button' onClick={ connectToBackend } disabled={ !state.backend.host || !state.backend.port }>Connect</Button>
              </div>
              <h3>Want to use OpenID Connect?</h3>
              <span>Simply complete the configuration below.</span>
              <div className='ControlGroup'>
                <input className='TextBox' value={ state.backend.authentication.identityProviderUrl } onChange={ changeIdentityProviderUrl } placeholder='Identity Provider URL' />
                <input className='TextBox' value={ state.backend.authentication.clientId } onChange={ changeClientId } placeholder='Client ID' />
                <input className='TextBox' value={ state.backend.authentication.scope } onChange={ changeScope } placeholder='Scope' />
                <label>Strict mode? <input type='checkbox' checked={ state.backend.authentication.strictMode } onChange={ changeStrictMode } /></label>
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
          {

            // We explicitly check for false here, as the value null is also allowed
            // and has a different meaning than false.
          }
          <MessageBar type='error' isVisble={ state.backend.isBackendReachable === false }>
            The backend is not reachable, is it running? <Button onClick={ disconnectFromBackend }>Disconnect me</Button> <Button onClick={ connectToBackend }>Reconnect me</Button>
          </MessageBar>
        </View>

        <View orientation='horizontal' size='auto'>
          <Symbols />
          <Sidebar>
            <Brand suffix='console' />
            <Sidebar.Item>
              <ConnectionButton onDisconnect={ disconnectFromBackend } />
            </Sidebar.Item>
          </Sidebar>
          <View id='screen' orientation='vertical'>
            <View orientation='horizontal' size='flex'>
              <View orientation='vertical' size='flex'>
                <View size='flex'>
                  <Editor
                    configuration={ state.backend.configuration }
                    value={ state.programming.code }
                    onCommandCreate={ insertCommand }
                    onChange={ editCode }
                    onExecute={ executeCode }
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
