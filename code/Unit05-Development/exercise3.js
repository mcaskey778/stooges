// Use the MarkLogic Node.js API to connect to
// and read a JSON document from the database.
// This is an example of using the callback result handling technique.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js")

var dbRead = // create a database client for restReader
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var myURI = "/songs/song2.json";

dbRead.documents.read(myURI).result(
  function(documents){
    documents.forEach(function(document){
      // start by viewing the raw response
      console.log(document);

      // try to write some code that will interact with that
      // response to give us the required data.  Here are some hints:
      //console.log("URI=" + document.uri);
      //console.log("ARTIST=" + document.content["top-song"].artist);

    });
  },
  function(error){
    console.log(JSON.stringify(error, null, 2));
  }
);
