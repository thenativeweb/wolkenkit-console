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
import { Product, Sidebar, View } from 'thenativeweb-ux';

var Connected = function Connected() {
  return React.createElement(React.Fragment, null, React.createElement(Sidebar, null, React.createElement(Sidebar.Brand, null, React.createElement(Product, {
    name: "console"
  })), React.createElement(Sidebar.Item, {
    iconName: "active-connection"
  }, React.createElement(Sidebar.Item, null, state.backend.user ? "Authenticated as ".concat(state.backend.user.name || state.backend.user.nickname || 'unnamed user', " (").concat(state.backend.user.sub, ")") : 'Not authenticated (anonymous)'), React.createElement(Sidebar.Item, {
    onClick: backend.handleDisconnectClicked
  }, "Disconnect"))), React.createElement(View, {
    orientation: "vertical",
    adjust: "flex",
    style: {
      overflow: 'hidden'
    }
  }, React.createElement(View, {
    orientation: "horizontal",
    adjust: "flex",
    style: {
      overflow: 'hidden'
    }
  }, React.createElement(View, {
    orientation: "vertical",
    adjust: "flex",
    style: {
      overflow: 'hidden',
      maxWidth: 700
    }
  }, React.createElement(View, {
    adjust: "flex"
  }, React.createElement(Editor, {
    configuration: state.backend.configuration,
    value: state.programming.code,
    onChange: programming.handleCodeEdited,
    onExecute: programming.handleExecuteCodeClicked
  }))), React.createElement(View, {
    orientation: "vertical",
    adjust: "flex",
    style: {
      overflow: 'hidden'
    }
  }, React.createElement(Tabs, null, React.createElement(EventConsole, {
    title: "Events (".concat(state.watching.collectedEvents.length, ")")
  }), React.createElement(ReadModelConsole, {
    title: "ReadModels"
  })))), React.createElement(View, {
    adjust: "auto"
  }, React.createElement(ErrorConsole, null))));
};

export default observer(Connected);