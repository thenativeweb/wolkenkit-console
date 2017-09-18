import { autorun, extendObservable, toJS } from 'mobx';

const stateKey = 'wolkenkit-console-state';

let previousApplication = window.localStorage.getItem(stateKey) || undefined;

try {
  previousApplication = JSON.parse(previousApplication);
} catch (ex) {
  previousApplication = undefined;
}

const application = extendObservable({}, previousApplication || {
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
});

let isFirstRun = true;

autorun(() => {
  const state = toJS(application);

  if (!isFirstRun) {
    window.localStorage.setItem(stateKey, JSON.stringify(state));
  }
  isFirstRun = false;
});

export default application;
