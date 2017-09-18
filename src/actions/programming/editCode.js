import state from '../../state';

const editCode = function (newCode) {
  if (!newCode) {
    throw new Error('Code is missing.');
  }

  state.programming.code = newCode;
};

export default editCode;
