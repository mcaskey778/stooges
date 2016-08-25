// Use the MarkLogic Node.js API to connect to a database,
// insert a document from memory, and then read the document that was inserted.
// Node.js is asynchronous, so we will use a promise result handling pattern
// to ensure that the document insert is complete before trying to read the document.
'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js")

// This example will use the connection information defined in connections.js
// Note that when inserting the document, you must use dbWrite.
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var uri = "/songs/song3.json";
var doc = [
  { "uri": uri,
    "contentType": "application/json",
    "content": { "top-song": { "title": "My New Song", "artist": "My Name" } }
  }
];

//Use a promise and its "then" method to ensure the write has finished before doing the read
dbWrite.documents.write(doc).result().then(
  function(response){
    console.log("Finished with write");

    dbRead.documents.read(uri).result(
      function(documents){
        documents.forEach(function(document){
          console.log("URI=" + document.uri);
          console.log("DOCUMENT=" + JSON.stringify(document.content));
          console.log("ARTIST=" + document.content["top-song"].artist);
          console.log("TITLE=" + document.content["top-song"].title);
        });
      },
      function(error){
        console.log(JSON.stringify(error, null, 2));
      }
    );
  },
  function(error) {
      console.log(JSON.stringify(error));
    }
);
