// Execute a SPARQL query to tell us all the triples
// that have John Lennon as the subject.

"use strict";

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var mlAdmin = marklogic.createDatabaseClient(dbConn.mlAdmin);

var query = [
  "PREFIX db: <http://dbpedia.org/resource/>",
  "SELECT * ",
  "WHERE { db:John_Lennon ?p ?o }"
];

mlAdmin.graphs.sparql("application/sparql-results+json", query.join("\n")
).result(function (response) {
  console.log(JSON.stringify(response, null, 2));
}, function(error) {
  console.log(JSON.stringify(error, null, 2));
});
