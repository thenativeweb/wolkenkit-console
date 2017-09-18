import pick from 'lodash/pick';
import { autorun, toJS } from 'mobx';

let isFirstRun = true;

const autoSave = function (options) {
  const { key, take, state } = options;

  autorun(() => {
    const stateAsObject = toJS(state);
    const stateToPersist = pick(stateAsObject, take);

    if (!isFirstRun) {
      window.localStorage.setItem(key, JSON.stringify(stateToPersist));
    }
    isFirstRun = false;
  });
};

export default autoSave;
