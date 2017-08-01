#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const fs = require('fs'),
      http = require('http'),
      https = require('https'),
      path = require('path');

const express = require('express'),
      flaschenpost = require('flaschenpost'),
      processenv = require('processenv');

const logger = flaschenpost.getLogger();

const app = express(),
      portHttp = processenv('PORT_HTTP') || 8000,
      portHttps = processenv('PORT_HTTPS') || 9000;

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'build', 'web')));

try {
  const keysPath = path.join('/', 'keys', 'wildcard.wolkenkit.io');

  /* eslint-disable no-sync */
  const privateKey = fs.readFileSync(path.join(keysPath, 'privateKey.pem'), { encoding: 'utf8' });
  const certificate = fs.readFileSync(path.join(keysPath, 'certificate.pem'), { encoding: 'utf8' });
  /* eslint-enable no-sync */

  https.createServer({ key: privateKey, cert: certificate }, app).listen(portHttps, () => {
    logger.info('Console server started (HTTPS).', { port: portHttps });
  });

  const appRedirect = express();

  appRedirect.get(/.*/, (req, res) => {
    res.writeHead(301, {
      location: `https://${req.headers.host}${req.url}`
    });
    res.end();
  });

  http.createServer(appRedirect).listen(portHttp, () => {
    logger.info('Console redirect server started (HTTP).', { port: portHttp });
  });
} catch (ex) {
  logger.warn('Failed to load SSL keys, falling back to HTTP.');

  http.createServer(app).listen(portHttp, () => {
    logger.info('Console server started (HTTP).', { port: portHttp });
  });
}
