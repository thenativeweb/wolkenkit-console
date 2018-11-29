import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { autorun, toJS } from 'mobx';
var isFirstRun = true;

var autoSave = function autoSave(options) {
  var key = options.key,
      take = options.take,
      skip = options.skip,
      state = options.state;
  autorun(function () {
    var stateAsObject = toJS(state);
    var stateToPersist = omit(pick(stateAsObject, take), skip);

    if (!isFirstRun) {
      window.sessionStorage.setItem(key, JSON.stringify(stateToPersist));
    }

    isFirstRun = false;
  });
};

export default autoSave;