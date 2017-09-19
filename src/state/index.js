import autoSave from './autoSave';
import { extendObservable } from 'mobx';
import load from './load';
import merge from 'lodash/merge';
import { backend, connecting, debugging, programming, subscriptions, watching } from './defaults';

const key = 'wolkenkit-console-state';

const state = extendObservable({}, merge({}, {
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
  skip: [ 'backend.app' ],
  key
});

export default state
