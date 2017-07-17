import application from './readModel/application';
import Brand from './components/Brand';
import Button from './components/Button';
import Editor from './components/Editor';
import ErrorConsole from './components/ErrorConsole';
import EventConsole from './components/EventConsole';
import { observer } from 'mobx-react';
import program from './readModel/program';
import React from 'react';
import ReadModelsConsole from './components/ReadModelsConsole';
import sandbox from './sandbox';
import Sidebar from './components/Sidebar';
import Tabs from './components/Tabs';
import View from './components/View';
import { changeHost, changePort, connectToBackend } from './writeModel/backend';
import { editCode, executeCode, insertCommand } from './writeModel/programming';
import './App.css';

const App = function () {
  if (!application.isConnected) {
    return (
      <div className='wk-app'>
        <Sidebar>
          <Brand suffix='console' />
        </Sidebar>
        <View orientation='vertical' alignItems='center' justifyContent='center'>
          <h2>Connect to a wolkenkit application</h2>
          <div className='ControlGroup'>
            <input className='TextBox' value={ application.host } onChange={ changeHost } />
            <input className='TextBox TextBox--port' value={ application.port } onChange={ changePort } />
            <Button className='Button' onClick={ connectToBackend }>Connect</Button>
          </div>
        </View>
      </div>
    );
  }

  return (
    <div className='wk-app'>
      <Sidebar>
        <Brand suffix='console' />
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
              <EventConsole title='Events' app={ sandbox.getApp() } />
              <ReadModelsConsole title='ReadModels' configuration={ application.configuration } app={ sandbox.getApp() } />
            </Tabs>
          </View>
        </View>
      </View>
    </div>
  );
};

export default observer(App);
