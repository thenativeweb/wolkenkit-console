#!/usr/bin/env node

/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

const http = require('http'),
      path = require('path');

const express = require('express'),
      flaschenpost = require('flaschenpost');

const logger = flaschenpost.getLogger();

const app = express(),
      port = 3000;

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'build', 'web')));

const server = http.createServer(app);

server.listen(port, () => {
  logger.info('Console server started.');
});
