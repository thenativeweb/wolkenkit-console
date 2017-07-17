/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const roboter = require('roboter');

roboter.
  workOn('server').
  equipWith(task => {
    task('universal/analyze', {
      src: [ 'src/**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js', '!build/**/*.js' ],
      rules: '.eslintrc.json'
    });
  }).
  start();
