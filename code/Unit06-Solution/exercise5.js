// Get a documents metadata

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");

// This example will use the connection information defined in connections.js
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

// HINT: Explore your DB in Query Console and Copy / Paste the URI
var uri = "YOUR URI HERE";
//var uri = ["URI 1", "URI 2"]

dbRead.documents.read(
  {
    uris: uri,
    categories: ["metadata"]
  }
).result(
  function(documents) {
    for (var i in documents) {
      console.log('Metadata for URI: ' + documents[i].uri);
      console.log(documents[i]);
    }
  },
  function(error) {
    console.log(JSON.stringify(error));
  }
);
