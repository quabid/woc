/**
 *  Client runner examples
 *
 *  Post Request Synopsis:  npm run client "host-address port path method" "header1=value1, header2=value2" "data1:value1, data2:value2"
 *
 *  Get Request Synopsis: npm run client "host-address port path method"
 *
 *  Instantiat and initialize Client class
 *
 *  const request = new Client();
 *
 *  Make a post request to a server online
 *  request
 *      .makeRequest({
 *          method: 'post',
 *          host: 'some-network-address.com',
 *          port: 80,
 *          path: /register
 *      },
 *      stringify(registrationData),
 *      (results) => {
 *          table(results);
 *      });
 */

const Url = require("url");

const { Client } = require("./client");
const { log, table } = require("../custom_modules/Logger");
const {
    stringUtils: { strsize, isString },
    urlUtils: { hasProtocol, hasSecureProtocol, addProtocol },
    objectUtils: { stringify, objsize, parser },
    messageUtils: {
        informationMessage,
        successMessage,
        errorMessage,
        warningMessage,
        statusMessage,
        fyi,
    },
} = require("../custom_modules/utils");

const request = new Client();
const exitProg = (exitCode = 0) => process.exit(exitCode);

const makeRequest = (arguments, handler) => {
    const methodPattern = /(get|post|put|patch|delete)/gi;
    try {
        const method = arguments[0].split(" ")[3].match(methodPattern)[0];

        switch (
            method
                .toString()
                .toLowerCase()
                .trim()
        ) {
            case "get":
                // log( informationMessage( `Request Method: ${ method }\n\n` ) );
                getRequested(arguments, handler);
                break;

            case "post":
                // log( informationMessage( `Request Method: ${ method }\n\n` ) );
                postRequested(arguments, handler);
                break;

            case "put":
                // log( informationMessage( `Request Method: ${ method }\n\n` ) );
                putRequested(arguments, handler);
                break;
        }
    } catch (err) {
        // console.clear();
        console.error(err.message);
    }
};

/** Post request.
 *  @param arguments - Contains 3 elements:
 *      arguments[0]: <options> - Comma separated string containing: <hostname, port, path, <Post> >
 *
 *      arguments[1]: <headers> - Comma separated string containing key/value pairs:
 *          key1=value1,key2=value2,key3=value3
 *
 *      arguments[2]: <data> - Comma separated string containing key/value pairs
 *          key1:value1,key2:value2,key3:value3
 */
function postRequested(arguments, handler = null) {
    // log(`CLI arguments ${stringify(arguments)}\n`);

    // Extract request options
    const optionsSplit = arguments[0].split(" "),
        optionSize = optionsSplit.length,
        options = {},
        headersContent = arguments[1],
        headers = {},
        datumSplit = arguments[2].split(","),
        data = {};

    options["headers"] = headers;

    extractOptions(optionSize, options, optionsSplit);

    extractData(datumSplit, data);

    extractHeaders(headersContent, headers, stringify(data));

    // log( `Headers: ${ stringify( headers ) }` );
    // log( `Options: ${ stringify( options ) }` );
    // log( `Data: ${ stringify( data ) }` );

    execute(options, stringify(data), handler);
}

/** Put request.
 *  @param arguments - Contains 3 elements:
 *      arguments[0]: <options> - Comma separated string containing: <hostname, port, path, <Put> >
 *
 *      arguments[1]: <headers> - Comma separated string containing key/value pairs:
 *          key1=value1,key2=value2,key3=value3
 *
 *      arguments[2]: <data> - Comma separated string containing key/value pairs
 *          key1:value1,key2:value2,key3:value3
 */
function putRequested(arguments, handler = null) {
    // log(`CLI arguments ${stringify(arguments)}\n`);

    // Extract request options
    const optionsSplit = arguments[0].split(" "),
        optionSize = optionsSplit.length,
        options = {},
        headersContent = arguments[1],
        headers = {},
        datumSplit = arguments[2].split(","),
        data = {};

    options["headers"] = headers;

    extractOptions(optionSize, options, optionsSplit);

    extractData(datumSplit, data);

    extractHeaders(headersContent, headers, stringify(data));

    // log( `Headers: ${ stringify( headers ) }` );
    // log( `Options: ${ stringify( options ) }` );
    // log( `Data: ${ stringify( data ) }` );

    execute(options, stringify(data), handler);
}

function extractData(datumSplit, data) {
    datumSplit.forEach(datum => {
        const dataSplit = datum.split(":");
        data[`${dataSplit[0]}`] = dataSplit[1];
    });
}

function extractHeaders(headersContent, headers, strData) {
    // log( `Headers size: ${headersContent.split(',').length}` );
    headers["content-length"] = strData.length || 0;

    let headersContentSplit;
    if (!headersContent.includes(",")) {
        headersContentSplit = headersContent.split("=");
        headers[`${headersContentSplit[0]}`] = headersContentSplit[1];
    } else {
        headersContentSplit = headersContent.split(",");
        headersContentSplit.forEach(pair => {
            const pairSplit = pair.split("=");
            headers[`${pairSplit[0]}`] = pairSplit[1];
        });
    }

    return;
}

/** Get request.
 *  @param arguments - Contains 2 elements:
 *      arguments[0]: options - Comma separated string containing: <hostname, port, path, <Get> >
 *
 *      [arguments[1]]: params - Comma separated string containing: key1=value1,key2=value2,key3=value3
 */
function getRequested(arguments, handler = null) {
    // log(`CLI arguments ${stringify(arguments)}\n`);

    // Extract request options
    const optionsSplit = arguments[0].split(" "),
        optionSize = optionsSplit.length,
        options = {};

    extractOptions(optionSize, options, optionsSplit);

    // Exract URI parameters
    if (arguments.length > 1) {
        extractParams(arguments, options);
    }

    // log(`Options: ${objsize(options)}`);
    // log(`User options: ${stringify(options)}`);

    execute(options, null, handler);
}

function extractParams(arguments, options) {
    options.path += `?`;
    if (arguments[1].includes(",")) {
        const arrParams = arguments[1].split(",");
        arrParams.forEach((param, index) => {
            if (index < arrParams.length - 1) {
                options.path += `${param},`;
            } else {
                options.path += `${param}`;
            }
        });
    } else {
        options.path += arguments[1];
    }
}

function extractOptions(optionSize, options, optionsSplit) {
    switch (optionSize) {
        case 4:
            options["hostname"] = optionsSplit[0];
            // options['host'] = optionsSplit[0];
            options["port"] = optionsSplit[1];
            options["path"] = optionsSplit[2];
            options["method"] = optionsSplit[3];
            break;
    }
}

function execute(options, data = null, handler = null) {
    const resultsHandler = results =>
        log(`Results: ${JSON.stringify(results)}`);
    try {
        if (options.port == "443") {
            request.makeSRequest(options, data, handler || resultsHandler);
        } else {
            request.makeRequest(options, data, handler || resultsHandler);
        }
    } catch (err) {
        log(err);
    }
}

exports.sendRequest = (arguments, handler = null) =>
    makeRequest(arguments, handler);
