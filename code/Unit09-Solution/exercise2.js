// Customize the artist facet
// Display results in descending frequency order with a limit of 10 results

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qText = "the beatles";

dbRead.documents.query(
    qb.where(
      qb.parsedFrom(qText)
    )
    .calculate(
      qb.facet("artist", qb.facetOptions("frequency-order", "descending", "limit=10"))
    )
    .slice(1, 2, qb.extract({
        paths: ["//artist", "//title"]
      })
    )
).result( function(responseData) {
  responseData[0].facets.artist.facetValues.forEach(function(facet) {
    console.log(facet.value + " (" + facet.count + ")");
  });
});
