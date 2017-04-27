/*KevinC*/

/*
---------------------
	request: 
	-parameter1
	-parameter2
	-parameter...
---------------------

	create_user:
	-display_name
	-username
	-password
	-type

	login:
	-username
	-password

	send_message:
	-message
	-user_id
	-conversation_id
	
	returns: {}

	get_messages:
	-conversation_id
	returns: {messages : [] }

	create_conversation:
	-user_id
	-user_id2

*/

var mysql = require("mysql");
var user_auth = require("../database/user_auth.js");
var users = require("../database/users.js");
var conversations = require("../database/conversations.js");
var mysql_db = require("../database/mysql_db.js");
var messages = require("../database/messages.js");
var invitations = require("../database/invitations.js");
var execute = require("../handler/execute.js");
var UserObject = require("../wrappers/user_object.js");

exports.core_get = function(req, res){
	var req_type = req.params.req_type;

	execute.initiate(); // initiates the execution library

	if (req_type == "create_user") {
		var name = req.query.display_name;
		var user = req.query.username;
		var pw = req.query.password;
		var type = req.query.type;

		execute.create_user(name, user, pw, parseInt(type)).then(function(result){
			res.send(JSON.stringify({display: name, username: user, password: pw, response: result}, null, 2));
		});
	} else if(req_type == "login"){
		var user = req.query.username;
		var pw = req.query.password;
		execute.user_login(user, pw).then(function(result){
			console.log("Sending: " + result);
			res.send(JSON.stringify({username: user, password: pw, response: result}, null, 2));
		});
	} else if(req_type == "send_message"){
		var message = req.query.message;
		var source_id = req.query.user_id;
		var conversation_id = req.query.conversation_id;
		var temporary_user = new UserObject(source_id, 1, "display-name");

		execute.send_message(temporary_user, conversation_id, message).then(function(result){
			res.send(JSON.stringify({meesage_id : result}, null, 2));
		});
	} else if(req_type == "get_messages"){
		var conversation_id = req.query.conversation_id;

		execute.load_messages(conversation_id).then(function(result){
			var json = {messages : result};
			res.send(JSON.stringify(json, null, 2));
		});
	} else if(req_type == "create_conversation"){
		var user_id = req.query.user_id;
		var user_id2 = req.query.user_id2;

		var temporary_user1 = new UserObject(user_id, 0, "display-name");
		var temporary_user2 = new UserObject(user_id2, 0, "display-name");

		execute.create_conversation(temporary_user1, temporary_user2).then(function(result){
			res.send(JSON.stringify({conversation_id : result}, null, 2));
		});
	} else if(req_type == "get_users"){
		var user_id = req.query.user_id;

		var temporary_user1 = new UserObject(user_id, 0, "display-name");

		execute.get_users(temporary_user1).then(function(result){
			res.send(JSON.stringify({users : result}, null, 2));
		});
	} else if(req_type == "get_users_all"){
		execute.get_users_all().then(function(result){
			res.send(JSON.stringify({users : result}, null, 2));
		});
	} else {
		res.send(JSON.stringify({status: false}, null, 2));
	}
}