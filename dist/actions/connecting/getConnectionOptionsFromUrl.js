import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import set from 'lodash/set';
import state from '../../state';

var getConnectionOptionsFromUrl = function getConnectionOptionsFromUrl() {
  var searchString = window.location.search;
  var gotOptionsFromUrl = false;

  if (searchString) {
    searchString = searchString.replace('?', '');
    var urlParameters = searchString.split('&');
    urlParameters.forEach(function (parameter) {
      var _parameter$split = parameter.split('='),
          _parameter$split2 = _slicedToArray(_parameter$split, 2),
          key = _parameter$split2[0],
          value = _parameter$split2[1];

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