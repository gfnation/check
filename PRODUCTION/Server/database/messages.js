/*KevinC*/

var mysql = require("mysql");
var util = require("../utils/util.js");
var encryptor = require('simple-encryptor')("secret-key-is-atleast16-chars-long");

/*
	Loads all the messages associated with a conversation_id
*/
exports.load_messages = function(connection, conversation_id){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_messages WHERE conversation_id=? ORDER BY message_time ASC";
		var array = [];
		connection.query(query, [conversation_id], function (err, rows, fields){
			if (err) {
				reject(err);
			} else {
				rows.forEach(function(element){
					var source_id = element['source_id'];
					var message_time = element['message_time'];
					var encrypted_message = element['message'];
					var decrypted_message = decrypt(encrypted_message);

					var message_entry = {'message' : decrypted_message, 'source_id' : source_id, 'message_time' : message_time};
					array.push(message_entry);
				});
				resolve(array);
			}
		});
	});
};

/*
	Stores a message given a coversation_id, a sender_id, and the raw message
*/
exports.save_message = function(connection, conversation_id, source_id, raw_message){
	return new Promise(function(resolve, reject){
		var query = "INSERT INTO tb_messages (message_id, conversation_id, source_id, message) VALUES(?, ?, ?, ?)";

		var message_id = util.md5_timed(raw_message + source_id);
		var encrypted_message = encrypt(raw_message);

		connection.query(query, [message_id, conversation_id, source_id, encrypted_message], function (err, rows, fields){
			if (err) {
				reject(err);
			}
			resolve(message_id);
		});
	});
};

function encrypt(string){
	var clean_string = "";
	if (!string) {
		clean_string = "";
	} else {
		clean_string = string;
	}
	return encryptor.encrypt(clean_string); //Provided by simple-encryptor
}

function decrypt(string){
	var clean_string = "";
	if (!string) {
		clean_string = "";
	} else {
		clean_string = string;
	}
	return encryptor.decrypt(clean_string); //Provided by simple-encryptor
}