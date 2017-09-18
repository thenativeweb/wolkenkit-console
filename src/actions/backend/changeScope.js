import state from '../../state';

const changeScope = function (event) {
  state.backend.authentication.scope = event.target.value;
};

export default changeScope;
