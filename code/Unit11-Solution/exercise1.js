// This is an example of updating an entire document.
// It's an update because the URI specified already exists in the database.
// We can tell that by doing a probe.

"use strict";

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var pb = marklogic.patchBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var uri = "/songs/Kesha+Tik-Tok.json";

var newDoc =
  {
    "top-song":
    {
      "artist": "Kesha",
      "title": "Tik Tok",
      "descr": "Some information about this song."
    }
  };

var newDocDescriptor = [
  { "uri": uri,
    "contentType": "application/json",
    "content": newDoc
  }
];

dbRead.documents.probe(uri).result(
  function(response) {
    if (response.exists) {
      console.log(response.uri + " exists.  Let's update it.");
      dbWrite.documents.write(newDocDescriptor).result().then(
        function(response){
          console.log("Finished with write.");
          dbRead.documents.read(uri).result(
            function(documents){
              documents.forEach(function(document){
                console.log("Updated Doc = " + JSON.stringify(document.content));
              });
            });
        });
    } else {
      console.log("URI " + response.uri + " does not exist, nothing to update.");
    }
  }
);
