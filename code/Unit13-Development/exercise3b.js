// Geospatial Search example.
// Find documents that are located within a polygon representing Hungary.

"use strict";

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var qb = marklogic.queryBuilder;

function polygon(shape) {
  return dbRead.documents.query(
    qb.where(
      qb.geospatial(
        qb.geoProperty(qb.property("location"), qb.property("coordinates")),
        qb.polygon(shape)
      )
    )
  ).result();
}

var hungary = [ [ 46.852386, 16.202298 ],
  [ 47.496171, 16.534268 ],
  [ 47.712902, 16.340584 ],
  [ 47.714866, 16.903754 ],
  [ 48.123497, 16.979667 ],
  [ 47.867466, 17.488473 ],
  [ 47.758429, 17.857133 ],
  [ 47.880954, 18.696513 ],
  [ 48.081768, 18.777025 ],
  [ 48.111379, 19.174365 ],
  [ 48.266615, 19.661364 ],
  [ 48.202691, 19.769471 ],
  [ 48.327567, 20.239054 ],
  [ 48.56285, 20.473562 ],
  [ 48.623854, 20.801294 ],
  [ 48.319971, 21.872236 ],
  [ 48.422264, 22.085608 ],
  [ 48.15024, 22.64082 ],
  [ 47.882194, 22.710531 ],
  [ 47.672439, 22.099768 ],
  [ 46.994238, 21.626515 ],
  [ 46.316088, 21.021952 ],
  [ 46.127469, 20.220192 ],
  [ 46.17173, 19.596045 ],
  [ 45.908878, 18.829838 ],
  [ 45.759481, 18.456062 ],
  [ 45.951769, 17.630066 ],
  [ 46.380632, 16.882515 ],
  [ 46.503751, 16.564808 ],
  [ 46.841327, 16.370505 ],
  [ 46.852386, 16.202298 ] ];

polygon(hungary).then(function(response) {
  response.forEach(function(document) {
    console.log(
      document.uri + " matches your polygon geo search (" +
      document.content.location.city + ", " +
      document.content.location.country + ")"
    );
  });
}).catch(function(error) {
  console.log("Error ", error);
});
