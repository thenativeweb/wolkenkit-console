import autoSave from './autoSave';
import load from './load';
import merge from 'lodash/merge';
import { observable } from 'mobx';
import { backend, connecting, debugging, programming, subscriptions, watching } from './defaults';
var key = 'wolkenkit-console-state';
var state = observable.object(merge({}, {
  backend: backend,
  connecting: connecting,
  debugging: debugging,
  programming: programming,
  subscriptions: subscriptions,
  watching: watching
}, load({
  key: key
})));
autoSave({
  state: state,
  take: ['backend', 'connecting'],
  skip: ['backend.app', 'backend.isConnected', 'backend.user', 'connecting.error'],
  key: key
});
export default state;