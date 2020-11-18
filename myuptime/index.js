// @ts-nocheck
/** Primary file for the API
 */

// Denpendencies
/* const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config'); */
import http from 'http';
import https from 'https';
import url from 'url';
import fs from 'fs';
import string_decoder from 'string_decoder';
import config from './config.js';

const stringDecoder = string_decoder.StringDecoder;
const stringify = (obj = {}) => JSON.stringify(obj);
const table = console.table.bind(console);
const cls = console.clear.bind(console);
const log = console.log.bind(console);

//Define handlers
const handlers = {};

handlers.ping = (data, cb) => {
  cb(200);
};

handlers.notFound = (data, cb) => {
  cb(404);
};

// Define a request router
const router = {
  ping: handlers.ping,
};

// All server logic for both http and https
const unifiedServer = (req, res) => {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path from the URL
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryString = parsedUrl.query;

  // Get HTTP method
  const method = req.method.toLowerCase();

  // Get the Headers as an object
  const headers = req.headers;

  // Get existing payloads
  const decoder = new stringDecoder('utf-8');
  let buffer = '';

  req
    .on('data', function (data) {
      buffer += decoder.write(data);
      log(`Buffer received: ${buffer}`);
    })
    .on('end', () => {
      buffer += decoder.end();

      // Choose the handler this request should go to
      const chosenHandler =
        typeof router[trimmedPath] !== 'undefined'
          ? router[trimmedPath]
          : handlers.notFound;

      // Constructor the data object to send to the handler
      const data = {
        trimmedPath: trimmedPath,
        queryString: queryString,
        method: method,
        headers: headers,
        payload: buffer,
      };

      // Route the request to the handler specified in the router
      chosenHandler(data, (statusCode, payload) => {
        statusCode = typeof statusCode == 'number' ? statusCode : 200;
        payload = typeof payload == 'object' ? payload : {};

        // Stringify the payload
        const strPayload = stringify(payload);

        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-XSS-Protection', '1;mode=block');
        res.setHeader(
          'Cache-control',
          'no-cache,no-store,max-age=0,must-revalidate'
        );
        res.setHeader('x-powered-by', 'Deez Nuts!@$?%&#');

        res.writeHead(statusCode);

        res.end(strPayload);

        log(`Returning this response: ${statusCode} and ${strPayload}`);
      });
    });
};

// Instantiating the HTTP server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// Instantiating the HTTPS server
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log(
    `\n\n\t\tHTTP Server is listening on port ${config.httpPort} in ${config.envName} mode.`
  );
});

httpsServer.listen(config.httpsPort, () => {
  console.log(
    `\n\n\t\tHTTPS Server is listening on port ${config.httpsPort} in ${config.envName} mode.`
  );
});
