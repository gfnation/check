var express = require("express");
var app = express();
var path = require('path');
var mysql_db = require("./database/mysql_db.js");


app.get("/", function(req, res){
	res.send("Welcome to the website index. The server is running on port 8080.");

	mysql_db.test();

    //res.sendFile(path.join(__dirname + '/startbootstrap-full-gh-pages/index.html'));
});

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
    console.log("Server is running on Port 8080");
});