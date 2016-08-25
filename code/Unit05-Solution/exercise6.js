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

// Streaming example.
// on("data") means a full document has been received.
dbRead.documents.read(myURI).stream()
  .on("data", function(document){
      console.log("URI=" + document[0].uri);
      console.log("DOCUMENT=" + JSON.stringify(document[0].content));
      console.log("ARTIST=" + document[0].content["top-song"].artist);
      console.log("TITLE=" + document[0].content["top-song"].title);
      console.log("---------");

    }).on("end", function(){
      console.log("Streaming complete.");

    }).on("error", function(error){
      console.log(JSON.stringify(error, null, 2));

    });
