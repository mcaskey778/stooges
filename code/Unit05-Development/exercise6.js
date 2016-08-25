// Use the MarkLogic Node.js API to connect to and read a JSON document from the database.
// Currently this example is using a callback result handling technique.
// Modify this example to use a stream result handling technique.
    // For more info on using streams please see:
    // http://docs.marklogic.com/guide/node-dev/intro#id_80029

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js")

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var myURI = "/songs/song2.json";

dbRead.documents.read(myURI).result(
  function(documents){
    documents.forEach(function(document){
      console.log("URI=" + document.uri);
      console.log("DOCUMENT=" + JSON.stringify(document.content));

      // note:  Because of the hyphen in the top-song property we cannot
      // use dot notation to access that property, and instead must use ["top-song"]
      console.log("ARTIST=" + document.content["top-song"].artist);
      console.log("TITLE=" + document.content["top-song"].title);
    });
  },
  function(error){
    console.log(JSON.stringify(error, null, 2));
  }
);
