/*KevinC*/

var mysql = require("mysql");

exports.open_connection_default = function(){
	var connection = mysql.createConnection({
	  host     : 'dxbase.c0h9f8yfuf6w.us-west-2.rds.amazonaws.com',
	  user     : 'chatadmin22',
	  password : 'chatpassword22',
	  database : 'firstdatabase'
	});
	return connection;
};

exports.open_connection = function(host, user, password, database){
	
	var connection = mysql.createConnection({
	  host     : host,
	  user     : user,
	  password : password,
	  database : database
	});

	return connection;
};

