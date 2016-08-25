// Delete a single document

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");

// This example will use the connection information defined in connections.js
// Note that when deleting the document, you must use dbWrite.
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var uri = "/songs/David-Bowie+Fame.json";

dbWrite.documents.remove(uri).result().then(function(response){
  console.log("Finished with Delete");
},
function(error){
  console.log(JSON.stringify(error, null, 2));
});
