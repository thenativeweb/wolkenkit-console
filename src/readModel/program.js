import { extendObservable } from 'mobx';

const program = extendObservable({}, {
  code: `/*
* Use the 'app' object to access your backend.
* For details on how to send commands see…
* https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/
*/`
});

export default program;
