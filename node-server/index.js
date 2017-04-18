var express = require("express");
var app = express();
var path = require("path");
var db_test = require("./database/db_test.js");

app.get("/", function(req, res){
	res.send("Welcome to the website index. The server is running on port 8080.");
});

app.get("/dbtest", function(req, res){
	res.send("dbtest! The server is running on port 8080.");
	db_test.test();
});

app.get("/invited.html", function(request, response) {
  //response.end("Welcome to the invited page!");
  response.sendFile(path.join( __dirname +'/html/invited.html'));
});

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
    console.log("Server is running on Port 8080");
});