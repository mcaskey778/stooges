// Perform a search where the search grammar is parsed from an input string.
// Return the title and artist of the top 5 results.
// Include intelligence to use a custom piece of grammar:
    // Example Search:  artist:Coldplay
    // This grammar should constrain that portion of search to the artist property.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qText = "art:coldplay";

dbRead.documents.query(
    qb.where(
      qb.parsedFrom(qText,
        qb.parseBindings(
          qb.value("artist", qb.bind("art"))
        )
      )
    ).slice(1, 5, qb.extract({
        paths: ["//artist", "//title"]
      }))
).result( function(matches) {
  matches.forEach(function(match) {
    console.log('Artist: '+ match.content.extracted[0].artist);
    console.log('Title: ' + match.content.extracted[1].title);
    console.log("--------")
  });
});
