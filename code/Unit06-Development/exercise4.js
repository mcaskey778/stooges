// Insert a document using automatic URI generation.
// Manage document metadata.

// Info: Technically you don't need to assign these permissions for the
// rest-reader and rest-writer roles.  They are automatically assigned
// when loading documents via the REST API.  Remember that the REST API is being
// used here behind the scenes.  However, for training purposes,
// this example shows how to explicitly define permissions on a document.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var fs = require("fs");

// This example will use the connection information defined in connections.js
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var file = "c:/mls-developer-node/Unit06/top-songs-source/songs/David-Bowie+Fame.json";

var doc = fs.readFile(file, "utf8", function (err,data) {
  if (err) {
    return console.log(err);
  }

  // write document to database
  dbWrite.documents.write([
    {
      "extension": "json",
      "directory": "/songs/",
      "collections": ["music"],
      "properties": { "property1": "some data", "property2": "some other data"},
      "quality": 2,
      "permissions": [
        {
          "role-name" : "rest-reader",
          "capabilities" : [ "read" ]
        },
        {
          "role-name" : "rest-writer",
          "capabilities" : [ "read", "update" ]
        }
      ],
      "contentType": "application/json",
      "content": data
    }
  ]).result(
    function(response) {
      console.log('Loaded ' + response.documents[0].uri);
    },
    function(error) {
      console.log(JSON.stringify(error));
    })
});
