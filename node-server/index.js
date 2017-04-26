var express = require("express");
var app = express();
var path = require("path");
var db_test = require("./tests/db_test.js");
var mysql_db = require("./database/mysql_db.js");
var user_auth = require("./database/user_auth.js");
var get_client = require("./get-post/get_client.js");

app.get("/", function(req, res){
	res.send("Welcome to the website index. The server is running on port 8080.");
});

app.get("/t/:test_id", function(req, res){
	db_test.multi_test(req, res);
});
app.put("/t/:test_id", function(req, res){
	db_test.multi_test(req, res);
});

app.get("/core/:req_type", function(req, res){
	get_client.core_get(req, res);
});

app.get("/invited.html", function(request, response) {
  //response.end("Welcome to the invited page!");
  response.sendFile(path.join( __dirname +'/html/invited.html'));
});

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
    console.log("Server is running on Port 8080");
});
