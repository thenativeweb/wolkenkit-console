import { extendObservable } from 'mobx';

const application = extendObservable({}, {
  host: 'local.wolkenkit.io',
  port: 3000,
  authentication: {
    identityProviderUrl: 'https://grundhoeferj.eu.auth0.com/authorize',
    clientId: 'Pny9tYykOORUAPC3JcIB8XMAJ_8nsv6c',
    scope: 'profile',
    strictMode: false
  },
  isConnected: false,
  configuration: undefined
});

export default application;
