// Use Structured Query to find matches where a term matches the entire property value. No partial match.
// Return the "title" and "artist" property of the top 5 results.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qText = "beatles";

dbRead.documents.query(
    qb.where(qb.value("artist", qText))
      .slice(1, 5, qb.extract({
        paths: ["//artist", "//title"]
      }))
).result( function(matches) {
  matches.forEach(function(match) {
    console.log('Artist: '+ match.content.extracted[0].artist);
    console.log('Title: ' + match.content.extracted[1].title);
    console.log("--------")
  });
});
