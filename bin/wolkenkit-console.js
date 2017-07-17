#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const path = require('path');

const express = require('express');
const app = express();

const PORT = 9000;

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'build', 'web')));

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`\nwolkenkit–console running at http://localhost:${PORT}\n`);
  /* eslint-enable no-console */
});
