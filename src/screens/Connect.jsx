import connecting from '../actions/connecting';
import injectSheet from 'react-jss';
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

const styles = () => ({
  ConnectionForm: {
    width: '60vw',
    'max-width': '460px',
    'margin-top': '10vh',
    'margin-bottom': '10vh'
  },

  Actions: {
    'border-top': 0,
    'margin-top': 0,
    'padding-top': 0
  }
});

const isConnectDisabled = function () {
  return (
    !state.connecting.host ||
    !state.connecting.port ||
    (state.connecting.useAuthentication && (!state.connecting.authentication.identityProviderUrl || !state.connecting.authentication.clientId))
  );
};

class Connect extends React.Component {
  /* eslint-disable class-methods-use-this */
  async componentDidMount () {
    if (state.connecting.shouldAutoConnect) {
      await connecting.tryToConnect();
    } else {
      connecting.getConnectionOptionsFromUrl();
    }
  }
  /* eslint-enable class-methods-use-this */

  render () {
    const { classes } = this.props;

    if (!state.backend || !state.backend.isConnected) {
      return (
        <React.Fragment>
          <Sidebar>
            <Sidebar.Brand><Product name='console' /></Sidebar.Brand>
          </Sidebar>
          <View orientation='vertical' alignItems='center' scrollable='auto'>
            <Form className={ classes.ConnectionForm } onSubmit={ connecting.handleConnectFormSubmitted }>
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

              {
                state.connecting.useAuthentication ?
                  <React.Fragment>
                    <ControlGroup>
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

                    <ControlGroup>
                      <ControlGroup.Item label='Client ID' adjust='flex'>
                        <TextBox
                          name='authentication.clientId'
                          value={ state.connecting.authentication.clientId }
                          onChange={ connecting.handleInputChanged }
                          placeholder='LKhjasdkfj…'
                        />
                      </ControlGroup.Item>
                    </ControlGroup>

                    <ControlGroup>
                      <ControlGroup.Item label='Scope' adjust='flex'>
                        <TextBox
                          name='authentication.scope'
                          value={ state.connecting.authentication.scope }
                          onChange={ connecting.handleInputChanged }
                          placeholder='profile'
                        />
                      </ControlGroup.Item>
                    </ControlGroup>

                    <ControlGroup>
                      <ControlGroup.Item type='checkbox' label='Use strict mode' adjust='flex'>
                        <CheckBox
                          id='authentication.strictMode'
                          name='authentication.strictMode'
                          checked={ state.connecting.authentication.strictMode }
                          onChange={ connecting.handleInputChanged }
                        />
                      </ControlGroup.Item>
                    </ControlGroup>
                  </React.Fragment> :
                  null
              }

              <Form.Actions className={ classes.Actions } type='stacked'>
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
  }
}

export default injectSheet(styles)(observer(Connect));
