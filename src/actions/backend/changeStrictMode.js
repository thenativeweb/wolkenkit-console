import state from '../../state';

const changeStrictMode = function (event) {
  state.backend.authentication.strictMode = event.target.checked;
};

export default changeStrictMode;
