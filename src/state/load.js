const load = function (options) {
  const { key } = options;

  let state = window.localStorage.getItem(key) || undefined;

  try {
    state = JSON.parse(state);
  } catch (ex) {
    state = undefined;
  }

  return state;
};

export default load;
