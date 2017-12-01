#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const path = require('path');

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
