// This function is an example of a multi-statement transaction.
// First, we start a transaction.
// Then, we read a document from the database.
// Then, we insert that document at a new URI.
// Then, we delete the old document.
// If all of those operations are successful, then the transaction commits.
// This is achieved with multiple promises to ensure success of each step.
// Finally, after the commit is complete, a function is called to show
// that the old document URI has been deleted and the new URI exists.

"use strict";

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var pb = marklogic.patchBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var currentUri = "/songs/Kesha+Tik-Tok.json";
var updatedUri = "/songs/Kesha+Tik-Tok2.json";

function resultSummary(docUris){
  docUris.forEach(function(docUri){
    dbRead.documents.probe(docUri).result()
    .then(function(response) {
      if (response.exists) {
        console.log(response.uri + " exists.");
      } else {
        console.log(response.uri + " does not exist.");
      };
    });
  });
};

function transactionalMove(oldUri, newUri) {
  var transactionId = null;
  dbWrite.transactions.open().result().
  then(function(txid) {
    transactionId = txid;
    return dbWrite.documents.read({uris: oldUri, txid: transactionId.txid}).result();
  }).
  then(function(document) {
    document[0].uri = newUri;
    return dbWrite.documents.write(
      {
        documents: document,
        txid: transactionId.txid
      }).result()
  })
  .then(function(response) {
    return dbWrite.documents.remove({uri: oldUri, txid: transactionId.txid}).result();
  })
  .then(function(response) {
    return dbWrite.transactions.commit(transactionId.txid).result();
  })
  .then(function(response){
    var uriArray = [];
    uriArray.push(oldUri, newUri);
    return resultSummary(uriArray);
  })
  .catch(function(error) {
    dbWrite.transactions.rollback(transactionId.txid);
    console.log("Error: ", error);
  });
}

transactionalMove(currentUri, updatedUri);
