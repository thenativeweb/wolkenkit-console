import { connecting } from '../../state/defaults';
import omit from 'lodash/omit';
import { set } from 'mobx';
import state from '../../state';

var resetState = function resetState() {
  set(state.connecting, omit(connecting, ['host', 'port', 'useAuthentication', 'authentication']));
};

export default resetState;