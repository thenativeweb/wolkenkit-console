import autoSave from './autoSave';
import { extendObservable } from 'mobx';
import load from './load';
import merge from 'lodash/merge';
import stripIndent from 'common-tags/lib/stripIndent';

const key = 'wolkenkit-console-state';

const loadedState = load({ key });

const state = extendObservable({}, merge({}, loadedState, {
  backend: {
    host: 'local.wolkenkit.io',
    port: 3000,
    tryToConnect: false,
    isBackendReachable: null,
    configuration: undefined,
    authentication: {
      identityProviderUrl: 'https://grundhoeferj.eu.auth0.com/authorize',
      clientId: 'Pny9tYykOORUAPC3JcIB8XMAJ_8nsv6c',
      scope: 'profile',
      strictMode: false
    }
  },
  programming: {
    code: stripIndent`
      /*
       * Use the 'app' object to access your backend.
       * For details on how to send commands see…
       * https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/
       */`
  },
  debugging: {
    selectedReadModel: 'none',
    selectedReadModelItems: [],
    collectedEvents: []
  }
}));

autoSave({ state, take: [ 'backend' ], key });

export default state;
