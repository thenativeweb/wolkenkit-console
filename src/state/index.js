import autoSave from './autoSave';
import load from './load';
import merge from 'lodash/merge';
import { observable } from 'mobx';
import { backend, connecting, debugging, programming, subscriptions, watching } from './defaults';

const key = 'wolkenkit-console-state';

const state = observable.object(merge({}, {
  backend,
  connecting,
  debugging,
  programming,
  subscriptions,
  watching
}, load({ key })));

autoSave({
  state,
  take: [ 'backend', 'connecting' ],
  skip: [ 'backend.app', 'backend.isConnected', 'backend.user', 'connecting.error' ],
  key
});

export const reset = function () {
  window.sessionStorage.removeItem(key);
};

export default state;
