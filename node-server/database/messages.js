var mysql = require("mysql");
var util = require("..utils/util.js");

exports.load_messages = function(connection, conversation_id){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_messages WHERE conversation_id=? ORDER BY message_time ASC";
		connection.query(query, [username], function (err, rows, fields){
			if (err) {
				reject(err);
			} else {
				var array = [];

				rows.forEach(function(element){
					var source_id = element['source_id'];
					var message_time = element['message_time'];
					var encrypted_message = element['message'];
					var decrypted_message = decrypt(encrypted_message);
					var element = {'message' : decrypted_message, 'source_id' : source_id, 'message_time' : message_time};
					array.push(element);
				});
				
				resolve(array);
			}
		});
	});
};

exports.save_message = function(connection, conversation_id, source_id, raw_message){
	return new Promise(function(resolve, reject){
		var query = "INSERT INTO tb_messages (message_id, conversation_id, source_id, message) VALUES(?, ?, ?, ?)";

		var message_id = util.md5_timed(message + source_id);
		var encrypted_message = encrypt(raw_message);

		connection.query(query, [message_id, conversation_id, source_id, encrypted_message], function (err, rows, fields){
			if (err) {
				reject(err);
			} else {
				resolve(message_id);
			}
		});
		resolve(undefined);
	});
};

function encrypt(string){
	return string;
}

function decrypt(string){
	return string;
}



