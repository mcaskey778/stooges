// Remove all documents within a specific directory
// Warning:  This is a sharp tool, use with caution.
// User must have rest-admin role to perform this action.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");

// This example will use the connection information defined in connections.js
// Note that when inserting the document, you must use dbWrite.
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

dbAdmin.documents.removeAll({ "directory": "/songs/" }).result(
    function(response) {
      console.log(JSON.stringify(response));
    }
);

// remove all documents in the entire database
// dbAdmin.documents.removeAll({ "all": true }).result(
//     function(response) {
//       console.log(JSON.stringify(response));
//     }
// );
