//Talks to the database. Its best to keep these files speartate from the server files. 

//Requirements for the code to run. Make sure you have them installed!
var express = require('express');
var mysql = require('mysql');


//Authentication: Asking the server to let us in. This would be our credentials.
var connection = mysql.createConnection({
host: 'localhost',
user:'root',
password:'',
database:"dxbase"

});

//If the connection screws up we need it to say somethiing. 
connection.connect(function(error) {
	if(!!error)  {
		console.log('Error');
	} else {
		console.log('Connected')
	}

});

app.get('/' function(req, resp) {

	connection.query("SELECT * FROM  mytable", function(error,rows,fields)
			if(!!error) {
				console.log('Error in query-ing table');
			} else {

				console.log()
			}

		)
}

app.listen(1337);