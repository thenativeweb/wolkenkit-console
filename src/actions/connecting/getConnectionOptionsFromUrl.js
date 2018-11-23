import set from 'lodash/set';
import state from '../../state';

const getConnectionOptionsFromUrl = function () {
  let searchString = window.location.search;
  let gotOptionsFromUrl = false;

  if (searchString) {
    searchString = searchString.replace('?', '');

    const urlParameters = searchString.split('&');

    urlParameters.forEach(parameter => {
      const [ key, value ] = parameter.split('=');

      switch (key) {
        case 'host':
        case 'port':
          set(state.connecting, key, value);
          gotOptionsFromUrl = true;
          break;
        default:
          break;
      }
    });

    if (gotOptionsFromUrl) {
      window.history.replaceState({}, 'wolkenkit-console', '/');
    }
  }
};

export default getConnectionOptionsFromUrl;
