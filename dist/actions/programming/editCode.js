import state from '../../state';

var editCode = function editCode(newCode) {
  if (newCode === undefined || newCode === null) {
    throw new Error('Code is missing.');
  }

  state.programming.code = newCode;
};

export default editCode;