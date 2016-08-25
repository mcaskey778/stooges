// Load a binary document. Since binaries may be large, use a write stream.
// The binary document we'll load is the "Inside MarkLogic Server" PDF.
// c:/mls-developer-node/Unit02/inside-marklogic-server-r7.pdf

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var fs = require("fs");

// This example will use the connection information defined in connections.js
// Note that when inserting the document, you must use dbWrite.
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var file = "c:/mls-developer-node/Unit02/inside-marklogic-server-r7.pdf";
var uri = file.replace("c:/mls-developer-node/Unit02/", "/binary/");

console.log('Writing a document from a stream...');

var writableStream = dbWrite.documents.createWriteStream({
  "uri": uri,
  "contentType": "application/pdf",
  "collections": ["binary", "pdf"]
  });

fs.createReadStream(file).pipe(writableStream);

writableStream.result(function(response) {
    console.log('Write complete.  URI = '+ response.documents[0].uri);
  }, function(error) {
    console.log(JSON.stringify(error));
  });
