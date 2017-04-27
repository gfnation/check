/*KevinC*/

/*

	READ READ READ READ READ READ READ READ READ READ 
	READ READ READ READ READ READ READ READ READ READ 
	READ READ READ READ READ READ READ READ READ READ 
	READ READ READ READ READ READ READ READ READ READ 

	You need to learn how to use promises to used the data passed
	by executing the functions. Because Node.js is asynchronous,
	promise must be used to handle asynchronous reads and writes that are occuring
	between the server and the database.

	READ READ READ READ READ READ READ READ READ READ 
	READ READ READ READ READ READ READ READ READ READ 
	READ READ READ READ READ READ READ READ READ READ 
	READ READ READ READ READ READ READ READ READ READ 
*/

var conversations = require("../database/conversations.js");
var user_auth = require("../database/user_auth.js");
var users = require("../database/users.js");
var messages = require("../database/messages.js");
var users = require("../database/users.js");
var mysql_db = require("../database/mysql_db.js");
var UserObject = require("../wrappers/user_object.js").UserObject;

var active_connection = undefined;

/*
	Used to initiate a database connection if it is undefined
*/
exports.initiate = function(){
	if (!active_connection) {
		active_connection = mysql_db.open_connection_default();
	};
};

/*
	Used to close the connection
*/
exports.terminate = function(){
	if (active_connection) {
		active_connection.end();
		active_connection = undefined;
	}
};

/*
	Returns a promise
*/
exports.create_user = function(display_name, username, raw_password, account_type){
	return user_auth.create_user(active_connection, display_name, username, raw_password, account_type);
}

/*
	Returns a promise
*/
exports.user_login = function(username, raw_password){
	return user_auth.user_login(active_connection, username, raw_password);
};

/*
	Returns a promise
	Users parameters are of the USER OBJECT
*/
exports.send_message = function(source_user, conversation_id, raw_message){
	return messages.save_message(active_connection, conversation_id, source_user.get_user_id(),raw_message);
};

/*
	Returns a promise
	Loads all messages associated with a conversation
*/
exports.load_messages = function(conversation_id){
	return messages.load_messages(active_connection, conversation_id);
}

/*
	Returns a promise
	Users parameters are of the USER OBJECT
*/
exports.create_conversation = function(user_object1, user_object2){
	return conversations.create_conversation(active_connection, user_object1.get_user_id(), user_object2.get_user_id());
};

/*
	Returns a promise
	Users parameters are of the USER OBJECT
*/
exports.get_conversations = function(user_object){
	return conversations.all_conversations(active_connection, user_object.get_user_id());
}

exports.get_users = function(user_object){
	return users.get_visible(active_connection, user_object.get_user_id(), user_object.get_account_type());
}

exports.get_users_all = function(){
	return users.get_all_users(active_connection);
}