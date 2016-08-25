// sort order example, sort by artist
// Must be backed by a range index

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
    ).orderBy(qb.sort("artist", "ascending"))
    .slice(1, 10, qb.extract({
        paths: ["//artist", "//title"]
      }))
).result( function(matches) {
    matches.forEach(function(match) {
      console.log(match.content.extracted[0].artist);
    });
});
