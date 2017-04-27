var mysql = require("mysql");
var user_auth = require("../database/user_auth.js");
var conversations = require("../database/conversations.js");
var mysql_db = require("../database/mysql_db.js");
var messages = require("../database/messages.js");
var invitations = require("../database/invitations.js");
var execute = require("../handler/execute.js");
var UserObject = require("../wrappers/user_object.js");

/*
	Multiple test cases that requires a request and response object returned
*/
exports.multi_test = function(req, res){
	var test_id = req.params.test_id;
	console.log("accessing: " + test_id); //prints the mode being accessed to the console

	execute.initiate(); // initiates the execution library
	if (test_id == "create_user") {
		var name = req.query.name;
		var user = req.query.user;
		var pw = req.query.pw;
		var type = req.query.type;
		execute.create_user(name, user, pw, parseInt(type)).then(function(result){
			res.send(JSON.stringify({display: name, username: user, password: pw, response: result}, null, 2));
		});
	} else if (test_id == "user_login") {
		var user = req.query.user;
		var pw = req.query.pw;

		execute.user_login(user, pw).then(function(result){
			console.log("Sending: " + result);
			res.send(JSON.stringify({username: user, password: pw, response: result}, null, 2));
		});
	} else if(test_id == "send_message"){
		var message = req.query.message;
		var source_id = req.query.source;
		var conversation_id = req.query.c_id;

		var temporary_user = new UserObject(source_id, 1, "display-name");
		execute.send_message(temporary_user, conversation_id, message).then(function(result){
				res.send("saved message: " + result);
		});
		/*
			messages.save_message(connection, conversation_id, source_id, message).then(function(result){
				res.send("saved message: " + result);
			});
		*/
	} else if(test_id == "get_messages"){
		var conversation_id = req.query.conversation_id;
		execute.load_messages(conversation_id).then(function(result){
			var json = {messages : result};
			res.send(JSON.stringify(json, null, 2));
		});
	} else if(test_id == "create_conversation"){
		var user_id = req.query.user_id;
		var user_id2 = req.query.user_id2;

		var temporary_user1 = new UserObject(user_id, 1, "display-name");
		var temporary_user2 = new UserObject(user_id2, 1, "display-name");

		execute.create_conversation(temporary_user1, temporary_user2).then(function(result){
			res.send("Conversation Id: " + result);
		});
	} else {
		res.send("unknown function");
	}
};