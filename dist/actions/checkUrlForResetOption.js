import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { reset } from '../state';

var checkUrlForResetOption = function checkUrlForResetOption() {
  var searchString = window.location.search;
  var shouldReset = false;

  if (searchString) {
    searchString = searchString.replace('?', '');
    var urlParameters = searchString.split('&');
    urlParameters.forEach(function (parameter) {
      var key;

      if (parameter.includes('=')) {
        var _parameter$split = parameter.split('=');

        var _parameter$split2 = _slicedToArray(_parameter$split, 1);

        key = _parameter$split2[0];
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