/*KevinC*/

var mysql = require("mysql");

/*
	Returns ALL users
*/
exports.get_all_users = function(connection){
	return new Promise(function(resolve, reject){
		var array = [];
		var query = "SELECT * FROM tb_users";
		connection.query(query, function(err, rows){
			if (err) {
				reject(err);
			} else {
				rows.forEach(function(element){
					var u_id = element['user_id'];
					var d_name = element['display_name'];
					var acc_type = element['account_type'];
					var user_info = {user_id : u_id, display_name: d_name, account_type: acc_type};
					array.push(user_info);
				});
			}
			resolve(array);
		});
	});
}

/*
	Returns all users visible to the target user
*/
exports.get_visible = function(connection, user_id, account_type){
	return new Promise(function(resolve, reject){
		var array = [];
		if (account_type == 0 || account_type == 1) {
			get_admins(connection, user_id).then(function(result){
				result.forEach(function(element){
					array.push(element);
				})
				return get_associates(connection, user_id);
			}).then(function(result){
				result.forEach(function(element){
					array.push(element);
				});
				resolve(array);
			}).catch(function(reject){
				throw reject;
			});
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
				reject(err);
			} else {
				if (rows.length > 0) {
					var type = row['account_type'];
					resolve(type);
				} else {
					resolve(-1);
				}
			}
		});
	});
};

/*
	Returns the display name of the user
*/
exports.get_display_name = function(connection, user_id){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_users WHERE user_id=?";
		connection.query(query, [user_id], function(err, rows, fields){
			if (err) {
				 reject(err);
			} else {
				if (rows.length > 0) {
					resolve(rows[0]['display_name']);
				} else {
					resolve("DISPLAY NAME ERROR");
				}
			}
		});
	});
};

/*
	Returns all associate accounts that is not the target user	
*/
function get_associates(connection, user_id){
	return new Promise(function(resolve, reject){
		var array = [];
		var query = "SELECT * FROM tb_users WHERE user_id<>? && account_type=?"
		connection.query(query, [user_id, 1], function(err, rows, fields){
			if (err) {
				reject(err);
			} else {
				rows.forEach(function(element){
					var u_id = element['user_id'];
					var d_name = element['display_name'];
					var acc_type = element['account_type'];
					var user_info = {user_id : u_id, display_name: d_name, account_type: acc_type};
					array.push(user_info);
				});
			}
			resolve(array);
		});
	});
}

/*
	Returns all admins that is not the target user
*/
function get_admins(connection, user_id){
	return new Promise(function(resolve, reject){
		var array = [];
		var query = "SELECT * FROM tb_users WHERE user_id<>? && account_type=?"
		connection.query(query, [user_id, 0], function(err, rows, fields){
			if (err) {
				reject(err);
			} else {
				rows.forEach(function(element){
					var u_id = element['user_id'];
					var d_name = element['display_name'];
					var acc_type = element['account_type'];
					var user_info = {user_id : u_id, display_name: d_name, account_type: acc_type};
					array.push(user_info);
				});
			}
			resolve(array);
		});
	});
}

function get_associated_associate(connection, user_id){
	return new Promise(function(resolve, reject){

	});
}

function get_associated_clients(connection, user_id){
	return new Promise(function(resolve, reject){

	});
}