// Probe:  check to see if a document exists in the database

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");

// This example will use the connection information defined in connections.js
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

// HINT: Explore your DB in Query Console and Copy / Paste the URI
var uri = "YOUR URI HERE";

dbRead.documents.probe(uri).result(
    function(response) {
      if (response.exists) {
        console.log(response.uri + " exists");
      } else {
        console.log(response.uri + " does not exist");
      }
    }
);
