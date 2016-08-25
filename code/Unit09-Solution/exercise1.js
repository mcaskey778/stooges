// Create a facet on the "artist" property.
// Study the raw response data.
// Think about how you will access the data that you want from the response.
// Then, update to output only the facet data.

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
    )
    .calculate(
      qb.facet("artist")
    )
    .slice(1, 2, qb.extract({
        paths: ["//artist", "//title"]
      })
    )
).result( function(responseData) {
  console.log("----FULL RESPONSE DATA----");
  console.log(responseData);
  console.log("----RESPONSE HEADER DATA----");
  console.log(responseData[0])
  console.log("----MATCH DATA 1----")
  console.log(responseData[1])
  console.log("----MATCH DATA 2----")
  console.log(responseData[2])

  // responseData[0].facets.artist.facetValues.forEach(function(facet) {
  //   console.log(facet.value + " (" + facet.count + ")");
  // });
});
