var express = require('express');
var app = express();
var router = express.Router();
var http = require("http");
var path = require('path');


// viewed at http://localhost:8080

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/invited.html", function(request, response) {
  //response.end("Welcome to the invited page!");
  response.sendFile(path.join( __dirname +'/invited.html'));
});


app.listen(8080);

//thanks scotch.io (Brandon)
//https://images2.alphacoders.com/806/806484.jpg