const load = function (options) {
  const { key } = options;

  let state = window.sessionStorage.getItem(key) || undefined;

  try {
    state = JSON.parse(state);
  } catch (ex) {
    state = undefined;
  }

  return state;
};

export default load;
