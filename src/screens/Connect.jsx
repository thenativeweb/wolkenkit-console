import backend from '../actions/backend';
import connecting from '../actions/connecting';
import { observer } from 'mobx-react';
import React from 'react';
import state from '../state';
import {
  Button,
  CheckBox,
  ControlGroup,
  Form,
  Headline,
  Message,
  Product,
  Sidebar,
  TextBox,
  View
} from 'thenativeweb-ux';

const isConnectDisabled = function () {
  return (
    !state.connecting.host ||
    !state.connecting.port ||
    (state.connecting.useAuthentication && (!state.connecting.authentication.identityProviderUrl || !state.connecting.authentication.clientId))
  );
};

const Connect = function () {
  if (!state.backend || !state.backend.isConnected) {
    return (
      <React.Fragment>
        <Sidebar>
          <Sidebar.Brand><Product name='console' /></Sidebar.Brand>
        </Sidebar>
        <View orientation='vertical' alignItems='center' justifyContent='start' scrollable='auto'>
          <Form onSubmit={ backend.handleConnectFormSubmitted }>
            <Headline>Connect to…</Headline>
            {
              state.connecting.error ?
                <Message type='error'>{ state.connecting.error }</Message> :
                null
            }
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
            </ControlGroup>

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

            <Form.Actions type='stacked'>
              <Button
                isPrimary={ true }
                disabled={ isConnectDisabled() }
              >Connect</Button>
            </Form.Actions>
          </Form>
        </View>
      </React.Fragment>
    );
  }
};

export default observer(Connect);
