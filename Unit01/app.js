"use strict";

var marklogic = require("marklogic");
var express = require("express");
var bodyParser = require("body-parser");

// setup the express router
var router = express.Router();

// setup the express app server
var app = express();
app.set("port", 3005);
app.set("view engine", "jade");
app.use("views", express.static(__dirname + "views"));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

// the database connection information
var db = marklogic.createDatabaseClient(
  {
    host: "localhost",
    port: 8006,
    authType: "digest",
    user: "admin",
    password: "admin"
  }
);

// a function that gets called on post requests to read a specific document
// URI from the database based on a value entered in a front-end field.
var select = function select(myURI) {
  return db.documents.read(myURI).result();
};


// do different things for different types of requests
var indexRoute = function (req, res) {
  if (req.method == "GET") {
    // for a get request simply render the index template
    res.render("index");
  } else if (req.method == "POST") {
    // for a post request, get the value of the docID field from the front end
    // pass the docID field value to a function to do the document read
    var docID = req.body.docID;
    select(docID).then(function(doc) {
      // Now, we could just send the whole document back to the front end.
      // But that is wasteful given our requirement to only use the displayName.
      // Instead we'll send an object with a name property equal to the displayName.
      try {
        var obj = {name: doc[0].content.owner.displayName};
        res.render("index", obj);
      } catch(err) {
        var obj = {name: "displayName or document not found."};
        res.render("index", obj);
      }
    });
  }
};

// define actions to take for different request types
router.route("/").get(indexRoute);
router.route("/").post(indexRoute);

app.use("/", router);
app.listen(app.get("port"));

console.log("Magic happens on port " + app.get("port"));
