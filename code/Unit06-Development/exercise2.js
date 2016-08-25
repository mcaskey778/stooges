// Insert a single document from the file system.
'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var fs = require("fs");

// This example will use the connection information defined in connections.js
// Note that when inserting the document, you must use dbWrite.
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var path = "c:/mls-developer-node/Unit06/top-songs-source/songs/";
var file = "David-Bowie+Fame.json";

var doc = fs.readFile(path + file, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  // write document to database
  dbWrite.documents.write([
    {
      "uri": "/songs/" + file,
      "contentType": "application/json",
      "content": data
    }
  ]).result(
    function(response){
        console.log("Finished with write.");
      },
      function(error){
        console.log(JSON.stringify(error, null, 2));
      });
});
