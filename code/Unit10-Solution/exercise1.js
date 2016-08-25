// Return the default snippet data.
// Access snippet data in the response.

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
    .slice(
      1, 2,
      qb.extract({ paths: ["//artist", "//title"] }),
      qb.snippet()
    )
).result( function(responseData) {
  // output the full response data
  console.log("----FULL RESPONSE----")
  console.log(responseData);

  // output the response header
  console.log("----RESPONSE HEADER----")
  console.log(responseData[0])

  // output the results from the header
  console.log("----RESPONSE HEADER RESULTS----")
  console.log(responseData[0].results)

  // output the results from the header
  console.log("----RESPONSE HEADER RESULTS MATCHES----")
  console.log(responseData[0].results[0].matches)

});
