import { connecting } from '../../state/defaults';
import omit from 'lodash/omit';
import { set } from 'mobx';
import state from '../../state';

const resetState = function () {
  set(state.connecting, omit(connecting, [ 'host', 'port', 'useAuthentication', 'authentication' ]));
};

export default resetState;
