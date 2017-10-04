import state from '../../state';

const editCode = function (newCode) {
  if (newCode === undefined || newCode === null) {
    throw new Error('Code is missing.');
  }

  state.programming.code = newCode;
};

export default editCode;
