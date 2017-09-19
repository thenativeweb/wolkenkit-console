import { connecting } from '../../state/defaults';
import { extendObservable } from 'mobx';
import omit from 'lodash/omit';
import state from '../../state';

const resetState = function () {
  extendObservable(state.connecting, omit(connecting, [ 'host', 'port', 'authentication' ]));
};

export default resetState;
