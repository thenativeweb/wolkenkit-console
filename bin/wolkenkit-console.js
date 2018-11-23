#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const http = require('http'),
      path = require('path');

// On Windows, nvm has the strange behavior to store applications inside of a
// node_modules directory. Hence finding the application's root path fails,
// which is tried in flaschenpost. To fix this, we manually set the root path
// here.
if (process.platform === 'win32' && __dirname.includes('\\nvm\\')) {
  /* eslint-disable no-process-env */
  process.env.APP_ROOT_PATH = path.join(__dirname, '..');
  /* eslint-enable no-process-env */
}

const express = require('express'),
      flaschenpost = require('flaschenpost');

flaschenpost.initialize({ appRootPath: path.join(__dirname, '..') });

const logger = flaschenpost.getLogger();

const app = express(),
      port = 3000;

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'build')));

const server = http.createServer(app);

server.listen(port, () => {
  logger.info('Console server started.', { port });
});
