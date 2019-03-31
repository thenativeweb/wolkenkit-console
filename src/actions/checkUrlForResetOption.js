import { reset } from '../state';

const checkUrlForResetOption = function () {
  let searchString = window.location.search;
  let shouldReset = false;

  if (searchString) {
    searchString = searchString.replace('?', '');

    const urlParameters = searchString.split('&');

    urlParameters.forEach(parameter => {
      let key;

      if (parameter.includes('=')) {
        [ key ] = parameter.split('=');
      } else {
        key = parameter;
      }

      if (key === 'reset') {
        shouldReset = true;
      }
    });

    if (shouldReset) {
      reset();

      window.location.replace('/');
    }
  }
};

export default checkUrlForResetOption;
