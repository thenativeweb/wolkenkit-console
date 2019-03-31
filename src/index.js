import App from './App';
import checkUrlForResetOption from './actions/checkUrlForResetOption';
import React from 'react';
import { render } from 'react-dom';

checkUrlForResetOption();

(async () => {
  render(<App />, document.querySelector('#root'));
})();
