const httpServer = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// Define route handlers
const handlers = {};

handlers.notFound = (data, cb) => cb(404);
handlers.hello = (data, cb) =>
  cb({ path: '/hello', welcome: 'Welcome to this route' });

const router = {
  hello: handlers.hello,
};

httpServer.createServer((req, res) => {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path from the URL
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\?+$/g, '');

  // Get the query string as an object
  const queryString = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
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

      // Choose the handler for this request
      const chosenHandler =
        typeof router[trimmedPath] !== 'undefined'
          ? router[trimmedPath]
          : handlers.notFound;
    });
});
