// Use Structured Query to find documents that satisfy all of the following:
    // are in the "/songs/" directory
    // have an artist property that contains the word "beatles"
    // have a genre property with a value that is equal to "rock"
    // have a title that does NOT contain the word "writer"
    // contain the word "love" OR "night" anywhere in the document
    // contain the words "hard" AND "day" within one word of each other
// Return the "title" and "artist" property of the top 5 results.

'use strict';

var marklogic = require("marklogic");
var dbConn = require("./connections.js");
var qb = marklogic.queryBuilder;

var dbRead = marklogic.createDatabaseClient(dbConn.restReader);
var dbWrite = marklogic.createDatabaseClient(dbConn.restWriter);
var dbAdmin = marklogic.createDatabaseClient(dbConn.restAdmin);

var searchDirectory = "/songs/"
var artistContains = "beatles";
var genreEquals = "rock";
var titleNotContains = "writer";
var docContains1 = "love";
var docContains2 = "night";
var docNearWord1 = "hard";
var docNearWord2 = "day";
var nearDistance = 1;

dbRead.documents.query(
    qb.where(
      qb.and(
        qb.directory(searchDirectory),
        qb.word("artist", artistContains),
        qb.value("genre", genreEquals),
        qb.not(
          qb.word("title", titleNotContains)
        ),
        qb.or(
          qb.term(docContains1),
          qb.term(docContains2)
        ),
        qb.near(
          qb.term(docNearWord1),
          qb.term(docNearWord2),
          nearDistance
        )
      )
    )
      .slice(1, 5, qb.extract({
        paths: ["//artist", "//title"]
      }))
).result( function(matches) {
  matches.forEach(function(match) {
    console.log('Artist: '+ match.content.extracted[0].artist);
    console.log('Title: ' + match.content.extracted[1].title);
    console.log("--------")
  });
});
