// Customize the artist facet
// Display results in descending frequency order with a limit of 10 results

'use strict';

var marklogic = require("marklogic");
var dbConn = require("../sw-connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qText = "the";

dbRead.documents.query(
    qb.where(
      qb.parsedFrom(qText)
    )
    .calculate(
      qb.facet(
          "height",
          qb.bucket("0 to 1", '0', '<', '1'),
          qb.bucket("1 to 2", '1', '<', '2'),
          qb.bucket("2 to 3", '2', '<', '3'),
          qb.bucket("3+", '3', '<')
      )
    )
    .slice(1, 2, qb.extract({
        paths: ["//name", "//height"]
      })
    )
).result( function(responseData) {
  responseData[0].facets.height.facetValues.forEach(function(facet) {
    console.log(facet.value + " (" + facet.count + ")");
  });
});
