const load = function ({ key }) {
  if (!key) {
    throw new Error('Key is missing');
  }

  if (window.location.search === 'reset') {
    return;
  }

  let state = window.sessionStorage.getItem(key) || undefined;

  try {
    state = JSON.parse(state);
  } catch (ex) {
    state = undefined;
  }

  return state;
};

export default load;
