var load = function load(options) {
  var key = options.key;
  var state = window.sessionStorage.getItem(key) || undefined;

  try {
    state = JSON.parse(state);
  } catch (ex) {
    state = undefined;
  }

  return state;
};

export default load;