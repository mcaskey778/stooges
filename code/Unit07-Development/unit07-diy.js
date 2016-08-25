// Perform a filtered search using Query By Example (QBE).

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./sw-connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var qbeDoc =
  {
    "alliance": {$word: "rebel"},
    "bio": {$word: "leia"},
    $filtered: true
  };

dbRead.documents.query(
    qb.where(
      qb.and(
        qb.directory('/character/'),
        qb.word("alliance", 'rebel'),
        qb.word("bio", 'leia')
        //qb.byExample(qbeDoc)
      )
    ).slice(1, 5, qb.extract({
        paths: ["//name", "//alliance", "//bio"]
      }))
).result( function(matches) {
  matches.forEach(function(match) {
    console.log('Name: '+ match.content.extracted[0].name);
    console.log('Alliance: ' + match.content.extracted[1].alliance);
    console.log('bio: ' + match.content.extracted[2].bio);
    console.log("--------")
  });
});
