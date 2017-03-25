var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/startbootstrap-full-gh-pages/index.html'));
});

app.listen(8080);



//thanks scotch.io (Brandon)
//https://images2.alphacoders.com/806/806484.jpg