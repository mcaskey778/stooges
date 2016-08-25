// Geospatial search example.
// Find matches within a 20 mile radius of San Francisco

"use strict";

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var qb = marklogic.queryBuilder;

function circle(radius, lat, lon) {
  return dbRead.documents.query(
    qb.where(
      qb.geospatial(
        qb.geoProperty(qb.property("location"), qb.property("coordinates")),
        qb.circle(radius, lat, lon)
      )
    )
  ).result();
}

var sanFranciscoLat = 37.7833;
var sanFranciscoLon = -122.4167;

circle(20, sanFranciscoLat, sanFranciscoLon).then(function(response) {
  response.forEach(function(document) {
    console.log(
      document.uri + " matches your circle geo search (" +
      document.content.location.city + ", " +
      document.content.location.country + ")"
    );
  });
})
.catch(function(error) {
  console.log("Error ", error);
});
