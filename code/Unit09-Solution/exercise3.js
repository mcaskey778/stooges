// Add a second facet for the genre data.
// Display results in descending frequency order with a limit of 10 results
// Dynamically iterate over all facets, outputting the results

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qText = "";

dbRead.documents.query(
    qb.where(
      qb.parsedFrom(qText)
    )
    .calculate(
      qb.facet("artist", qb.facetOptions("frequency-order", "descending", "limit=10")),
      qb.facet("genre", qb.facetOptions("frequency-order", "descending", "limit=10"))
    )
    .slice(1, 2, qb.extract({
        paths: ["//artist", "//title"]
      })
    )
).result( function(responseData) {
  // Note:  we now have two facets, so we need to loop over each to output data.
  // Because tomorrow we might decide to add another facet, we want flexible code.
  // Start by creating an array of the property names in the facet response data.
  var facetNames = [];
  var facetData = responseData[0].facets;

  for (var property in facetData) {
    facetNames.push(property);
  };

  // Next let's iterate over each of the facet names.
  facetNames.forEach(function(name) {

    // Next let's iterate over the data for that facet name and output it.
    console.log("----Begin " + name + " facet data----");

    facetData[name].facetValues.forEach(function(facet) {
      console.log(facet.value + " (" + facet.count + ")");
    });

    console.log("----End " + name + " facet data----");
  });
});
