// Use the MarkLogic Node.js API to connect to a database and read an XML document.
// This is an example of using the callback result handling technique.
// This example uses xmldom to work with the XML.
    // https://www.npmjs.com/package/xmldom
    // npm install xmldom
'use strict';

var marklogic = require("marklogic");
var DOMParser = require('xmldom').DOMParser;
var dbConn = require("./connections.js")

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var uri = "/songs/song1.xml";

dbRead.documents.read(uri).result(
  function(documents){
    documents.forEach(function(document){

      var doc = new DOMParser().parseFromString(document.content, "text/xml");

      // We want to loop over an array of artists.
      // So let's get all the artist elements.
      // In our example, this is really only 1 artist
      // since we are interacting with just a single document.

      // YOUR CODE HERE

      // But we'll build a loop around it, because we may
      // one day return multiple documents from the results of a search.
      for (var i = 0; i < artists.length; i++){
        var artist = artists.item(i).textContent;
        console.log(artist);
      }
    });
  },
  function(error){
    console.log(JSON.stringify(error, null, 2));
  }
);
