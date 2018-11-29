import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { autorun, toJS } from 'mobx';

let isFirstRun = true;

const autoSave = function (options) {
  const { key, take, skip, state } = options;

  autorun(() => {
    const stateAsObject = toJS(state);
    const stateToPersist = omit(pick(stateAsObject, take), skip);

    if (!isFirstRun) {
      window.sessionStorage.setItem(key, JSON.stringify(stateToPersist));
    }
    isFirstRun = false;
  });
};

export default autoSave;
