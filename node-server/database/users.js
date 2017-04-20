var mysql = require("mysql");

exports.get_visible = function(connection, user_id){
	return exports.get_type(connection, user_id).then(function(result){
		var array = [];
		var user_type = result;

		var query = "SELECT user_id FROM tb_users WHERE user_type= AND user_id<>?";

		if (user_type == 0) {

		} else if (user_type == 1) {

		} else if (user_type == 2) {
			
		}

	});
};

/*
	Returns the user-type associated with the user_id;
	0-admin
	1-associate
	2-client
*/
exports.get_type = function(connection, user_id){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_users WHERE user_id=?";
		connection.query(query, [user_id], function(err, rows, fields){
			if (err) {
				return err;
			} else {
				if (rows.length > 0) {
					var type = row['user_type'];
					return type;
				}
			}
		});
		return undefined;
	});
};

exports.get_display_names = function(connection, user_id){
	return new Promise(function(resolve, reject){
		var query "SELECT * FROM tb_users WHERE user_id=?";
		connection.query(query, [user_id], function(err, rows, fields){
			if (err) {
				return err;
			} else {
				if (rows.length > 0) {
					return rows[0]['display_name'];
				}
			}
		});
	});
};

function get_associates(connection, user_id){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_users WHERE user_id<>? && user_type=?"
		connection.query(query, [user_id, 1], function(err, rows, fields){
			if (err) {
				throw err;
			} else {

			}
		});
	});
}

function get_admins(connection, user_id){

}