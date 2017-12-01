#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const path = require('path');

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
      flaschenpost = require('flaschenpost'),
      httpsOrHttp = require('https-or-http'),
      processenv = require('processenv');

flaschenpost.initialize({ appRootPath: path.join(__dirname, '..') });

const logger = flaschenpost.getLogger();

const app = express(),
      certificateDirectory = path.join('/', 'keys', 'wildcard.wolkenkit.io'),
      portHttp = processenv('PORT_HTTP') || 8000,
      portHttps = processenv('PORT_HTTPS') || 9000;

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'build', 'web')));

httpsOrHttp({
  app,
  certificateDirectory,
  ports: {
    http: portHttp,
    https: portHttps
  }
}, (err, servers) => {
  if (err) {
    logger.error(err.message, err);

    return;
  }

  logger.info('Console server started.', { protocol: servers.app.protocol, port: servers.app.port });

  if (servers.redirect) {
    logger.info('Redirect server started.', { protocol: servers.redirect.protocol, port: servers.redirect.port });
  }
});
