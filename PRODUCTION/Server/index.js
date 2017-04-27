/*KevinC*/
var express = require("express");
var app = express();
var db_test = require("./tests/db_test.js");
var get_client = require("./get-post/get_client.js");

/*
	Root directory for making sure server is running.
*/
app.get("/", function(req, res){
	res.send("Welcome to the website index. The server is running on port 8080.");
});

/*
	For Testing
*/
app.get("/t/:test_id", function(req, res){
	db_test.multi_test(req, res);
});

/*
	Main API
*/
app.get("/api/:req_type", function(req, res){
	get_client.core_get(req, res);
});

/*
	Logs to the console to show that the server is running.
*/
app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
    console.log("Server is running on Port 8080");
});
