// This is an example of a partial, or patch update.
// First we will read a document and get its current artist value.
    // Use a promise to ensure the read is complete.
// Then do an update to replace the artist property with a new value.
    // Use another promise to make sure the update is complete.
// Then read the document again to get the latest value of the artist property.
// Finally, display the value of the artist element before and after the update.

"use strict";

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var pb = marklogic.patchBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var uri = "/songs/Kesha+Tik-Tok.json";
var oldArtist = "";

dbRead.documents.read(uri)
.result()
.then(function(response) {
  oldArtist = response[0].content["top-song"].artist;
  var newArtist = "Ke$ha";
  if (oldArtist) {
    return dbWrite.documents.patch(
      response[0].uri,
      pb.replaceInsert(
        "/top-song/artist",
        "/top-song/node('artist')",
        "last-child",
        newArtist)
    ).result();
  }
}).then(function(response) {
  return dbRead.documents.read(response.uri).result();
}).then(function(response) {
  console.log("Old artist: " + oldArtist);
  console.log("New artist: " + response[0].content["top-song"].artist);
});
