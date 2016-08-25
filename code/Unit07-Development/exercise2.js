// Perform a search where the search grammar is parsed from an input string.
// Return only the title and artist of the top 5 results.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qText = "coldplay";

dbRead.documents.query(
    qb.where(
      qb.parsedFrom(qText)
    ).slice(1, 5, qb.extract({
        paths: ["//artist", "//title"]
      }))
).result( function(matches) {
  // Study the full response data first to view its structure.
  // Think about how to programmatically iteract with it.
  //console.log(matches);
  matches.forEach(function(match){
    console.log('Artist: ' + match.content.extracted[0].artist);
    console.log('Title: ' + match.content.extracted[1].title);
    console.log('-------');
  })

  // matches.forEach(function(match) {
  //   console.log('Artist: '+ match.content.extracted[0].artist);
  //   console.log('Title: ' + match.content.extracted[1].title);
  //   console.log("--------")
  // });
});
