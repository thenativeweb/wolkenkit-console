import { extendObservable } from 'mobx';

const application = extendObservable({}, {
  host: 'local.wolkenkit.io',
  port: 3000,
  isConnected: false,
  configuration: undefined
});

export default application;
