// Perform a search using Query By Example (QBE).

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qbeDoc =
  {
    "artist": {$word: "the beatles"},
    "genre": "rock",
    "writer": {$word: "lennon"},
    "album": "Let It Be"
  };

dbRead.documents.query(
    qb.where(
      qb.byExample(qbeDoc)
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
