import backend from './actions/backend';
import Brand from './components/Brand';
import Button from './components/Button';
import CheckBox from './components/CheckBox';
import connecting from './actions/connecting';
import ConnectionButton from './components/ConnectionButton';
import ControlGroup from './components/ControlGroup';
import Editor from './components/Editor';
import ErrorConsole from './components/ErrorConsole';
import EventConsole from './components/EventConsole';
import Form from './components/Form';
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
import TextBox from './components/TextBox';
import View from './components/View';
import './App.css';

const isConnectDisabled = function () {
  return (
    !state.connecting.host ||
    !state.connecting.port ||
    (state.connecting.useAuthentication && (!state.connecting.authentication.identityProviderUrl || !state.connecting.authentication.clientId))
  );
};

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
            <View orientation='vertical' alignItems='center' justifyContent='start'>
              <Form type='centered' onSubmit={ backend.handleConnectFormSubmitted }>
                <Form.Title>Connect to…</Form.Title>
                <ControlGroup>
                  <ControlGroup.Item label='Host' adjust='flex'>
                    <TextBox
                      name='host'
                      autoFocus={ true }
                      value={ state.connecting.host }
                      onChange={ connecting.handleInputChanged }
                      placeholder='local.wolkenkit.io'
                    />
                  </ControlGroup.Item>

                  <ControlGroup.Item label='Port' adjust='auto'>
                    <TextBox
                      name='port'
                      type='port'
                      value={ state.connecting.port }
                      onChange={ connecting.handleInputChanged }
                      placeholder='3000'
                    />
                  </ControlGroup.Item>

                  <ControlGroup.Item adjust='auto'>
                    <Button
                      disabled={ isConnectDisabled() }
                    >Connect</Button>
                  </ControlGroup.Item>
                </ControlGroup>
                <ControlGroup.Divider />
                <ControlGroup>
                  <ControlGroup.Item
                    type='checkbox'
                    label='Use authentication'
                    adjust='flex'
                    helpLink='https://docs.wolkenkit.io/latest/reference/configuring-an-application/enabling-authentication/'
                  >
                    <CheckBox
                      id='use-authentication'
                      checked={ state.connecting.useAuthentication }
                      onChange={ connecting.handleAuthenticationChanged }
                    />
                  </ControlGroup.Item>
                </ControlGroup>

                <ControlGroup isVisible={ state.connecting.useAuthentication }>
                  <ControlGroup.Item label='Identity provider url' adjust='flex'>
                    <TextBox
                      name='authentication.identityProviderUrl'
                      autoFocus={ true }
                      value={ state.connecting.authentication.identityProviderUrl }
                      onChange={ connecting.handleInputChanged }
                      placeholder='https://your-identity-provider.com/authorize'
                    />
                  </ControlGroup.Item>
                </ControlGroup>

                <ControlGroup isVisible={ state.connecting.useAuthentication }>
                  <ControlGroup.Item label='Client ID' adjust='flex'>
                    <TextBox
                      name='authentication.clientId'
                      value={ state.connecting.authentication.clientId }
                      onChange={ connecting.handleInputChanged }
                      placeholder='LKhjasdkfj…'
                    />
                  </ControlGroup.Item>
                </ControlGroup>

                <ControlGroup isVisible={ state.connecting.useAuthentication }>
                  <ControlGroup.Item label='Scope' adjust='flex'>
                    <TextBox
                      name='authentication.scope'
                      value={ state.connecting.authentication.scope }
                      onChange={ connecting.handleInputChanged }
                      placeholder='profile'
                    />
                  </ControlGroup.Item>
                </ControlGroup>

                <ControlGroup isVisible={ state.connecting.useAuthentication }>
                  <ControlGroup.Item type='checkbox' label='Use strict mode' adjust='flex'>
                    <CheckBox
                      id='authentication.strictMode'
                      name='authentication.strictMode'
                      checked={ state.connecting.authentication.strictMode }
                      onChange={ connecting.handleInputChanged }
                    />
                  </ControlGroup.Item>
                </ControlGroup>
              </Form>
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
