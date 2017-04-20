var mysql = require("mysql");
var user_auth = require("../database/user_auth.js");
var conversations = require("../database/conversations.js");
var mysql_db = require("../database/mysql_db.js");

exports.test_user_create = function(){
	console.log("Within test function");
	var connection = mysql_db.open_connection_default();
	user_auth.user_create(connection, "kevin-user", "pw", 1);
};

exports.test_conversation_create = function(){
	var connection = mysql_db.open_connection_default();
	 conversations.create_conversation(connection, "user12", "user2").then(function(result){
		 console.log("final id: " + result);
	 });
}
