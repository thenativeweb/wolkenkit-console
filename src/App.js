import application from './readModel/application';
import Brand from './components/Brand';
import Button from './components/Button';
import ConnectionButton from './components/ConnectionButton';
import Editor from './components/Editor';
import ErrorConsole from './components/ErrorConsole';
import EventConsole from './components/EventConsole';
import Icon from './components/Icon';
import { observer } from 'mobx-react';
import program from './readModel/program';
import React from 'react';
import ReadModelsConsole from './components/ReadModelsConsole';
import Sidebar from './components/Sidebar';
import Symbols from './components/Symbols';
import Tabs from './components/Tabs';
import View from './components/View';
import { changeClientId, changeHost, changeIdentityProviderUrl, changePort, changeScope, changeStrictMode, connectToBackend, disconnectFromBackend } from './writeModel/backend';
import { editCode, executeCode, insertCommand } from './writeModel/programming';
import './App.css';

const App = function () {
  if (!application.tryToConnect) {
    return (
      <div className='wk-app'>
        {
          // <MessageBar text='The backend is not reachable, is it running?' type='error' condition={} />
        }
        {

          // We explicitly check for false here, as the value null is also allowed
          // and has a different meaning than false.
          application.isBackendReachable === false ?
            <div>!!! Backend is not reachable. !!!</div> :
            null
        }
        <Symbols />
        <Sidebar>
          <Brand suffix='console' />
          <Sidebar.Item type='centered'><Icon name='new-connection' /></Sidebar.Item>
        </Sidebar>
        <View orientation='vertical' alignItems='center' justifyContent='center'>
          <h2>Connect to a wolkenkit application</h2>
          <div className='ControlGroup'>
            <input className='TextBox' value={ application.host } onChange={ changeHost } />
            <input className='TextBox TextBox--port' value={ application.port } onChange={ changePort } />
            <Button className='Button' onClick={ connectToBackend } disabled={ !application.host || !application.port }>Connect</Button>
          </div>
          <h3>Want to use OpenID Connect?</h3>
          <span>Simply complete the configuration below.</span>
          <div className='ControlGroup'>
            <input className='TextBox' value={ application.authentication.identityProviderUrl } onChange={ changeIdentityProviderUrl } placeholder='Identity Provider URL' />
            <input className='TextBox' value={ application.authentication.clientId } onChange={ changeClientId } placeholder='Client ID' />
            <input className='TextBox' value={ application.authentication.scope } onChange={ changeScope } placeholder='Scope' />
            <label>Strict mode? <input type='checkbox' checked={ application.authentication.strictMode } onChange={ changeStrictMode } /></label>
          </div>
        </View>
      </div>
    );
  }

  return (
    <div className='wk-app'>
      {

        // We explicitly check for false here, as the value null is also allowed
        // and has a different meaning than false.
        application.isBackendReachable === false ?
          <div>!!! Backend is not reachable. !!!</div> :
          null
      }
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
                configuration={ application.configuration }
                value={ program.code }
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
    </div>
  );
};

export default observer(App);
