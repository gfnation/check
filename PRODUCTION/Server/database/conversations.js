/*KevinC*/
var mysql = require("mysql");
var util = require("../utils/util.js");

/*
	Returns all conversations associated with a user
*/
exports.all_conversations = function(connection, user_id){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_conversations WHERE user_id=? OR user_id2=?"
		connection.query(query, [user_id, user_id], function(err, rows, fields){
			if (err) {
				reject(err);
			} else {
				var array = [];
				rows.forEach(function(element){
					var conversation_id = element['conversation_id'];
					var user_id = element['user_id'];
					var user_id2 = element['user_id2'];
					var array_entry = {'conversation_id' : conversation_id, 'user_id': user_id, 'user_id2' : user_id2};
					array.push(array_entry);
				});
				resolve(array);
			}
		});
	});
};

/*
	Creates a new conversation using two user ids.
*/
exports.create_conversation = function(connection, user_id, user_id2){
	return exists(connection, user_id, user_id2).then(function(result){
		if (!result) {
			var query = "INSERT INTO tb_conversations (conversation_id, user_id, user_id2) VALUES(?, ?, ?)";
			var conversation_id = util.md5_timed(user_id + user_id2);

			connection.query(query, [conversation_id, user_id, user_id2], function(err, rows, fields){
				if (err) {
					return Promise.reject(err);
				}
			});
			return Promise.resolve(conversation_id);
		} else {
			return Promise.resolve(result);
		}
	});
};

/*
	Returns a promise to check if the conversation exists
*/
function exists(connection, user_id, user_id2){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_conversations WHERE (user_id=? AND user_id2=?) OR (user_id=? AND user_id2=?)";
		connection.query(query, [user_id, user_id2, user_id2, user_id], function(err, rows, fields){
			if (err) {
				reject(err);
			} else {
				if (rows.length > 0) {
					resolve(rows[0]['conversation_id']);
				} else {
					resolve(false);
				}
			}
		});
	});
}
