// Customize the default snippet response data:
    // Maximum of 3 total snippets per matching document.
    // Each snippet a maximum of 30 words or 200 characters.
    // Preference given to snippets found in the "descr" property.

// Implement logic to output information about each match, including:
    // Title, artist, snippet

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
      qb.snippet(
        { "max-snippet-chars": 200,
          "per-match-tokens": 30,
          "max-matches": 3,
          "preferred-matches": "descr"
        })
    )
).result( function(responseData) {

  // output output the results from the header
  console.log("----RESPONSE HEADER RESULTS MATCHES----")
  console.log(responseData[0].results[0].matches)

});
