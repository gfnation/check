var mysql = require("mysql");
var user_auth = require("./user_auth.js");
var mysql_db = require("./mysql_db.js");

exports.test = function(){

	var connection = mysql_db.open_connection_default();
	
	//user_auth.user_login(connection, "user", "password");
	user_auth.user_create(connection, "kevin-user", "pw", 1);

	console.log("Within test function");

};