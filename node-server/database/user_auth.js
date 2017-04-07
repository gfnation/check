var mysql = require("mysql");
var md5 = require("md5");
var sha256 = require("sha256");

/*
	Requires a database connection, username and a raw_password
	Returns a user_id associated with the logged in user.
	Returns undefined if no user has been found or has not been matched
*/
exports.user_login = function(connection, username, raw_password){
		var query = "SELECT * FROM tb_users WHERE username=?";
		connection.query(query, [username], function (err, rows, fields){
			if (err) {
				throw err;
			} else {
				rows.forEach(function(element){
					var private_token = element['private_token'];
					var hashed_password = element['password'];
					var user_id = element['user_id'];
					if (password_match(raw_password, private_token, password)) {
						return user_id;
					}
				});
			}
			return undefined;
		});
};

exports.user_create = function(connection, username, raw_password, account_type){
	if (!username_exists(connection, username)) {
		var private_token = generate_private_token();
		var user_id = md5(private_token + raw_password);
		var hashed_password = hash_password(raw_password, private_token);

		var query = "INSERT INTO tb_users (user_id, username, password, account_type, private_token)" +
						"VALUES(?, ?, ?, ?, ?)"

		connection.query(query, [user_id, username, hashed_password, account_type, private_token], 
			function(err, rows, fields){
			if (err) {
				throw err;
			} else {
				return true;
			}
		});
	};
	return false;
};

/*
	Used to check if the username exists.
	Returns true if username exists.
*/
function username_exists(connection, username){

	var query = "SELECT username FROM tb_users where username=?";

	connection.query(query, [username], function(err, rows, fields){
		if (err) {
			throw err;
		} else {
			if (rows) {
				return true;
			};
		}
	});
	return false;
}

/**
	Does password matching by hashinh a raw_password concatenated with a private_token.
	Does a comparison with a passed in hashed_password and returns true if they are equal.
*/
function password_match(raw_password, private_token, hashed_password){
	var hashed_raw_password = hash_password(raw_password, private_token);
	if (hashed_raw_password == hashed_password) {
		return true;
	}
	return false;
}

function hash_password(raw_password, private_token){
	return sha256(raw_password + private_token);
}

function generate_private_token(){
	return md5("" + Date.now());
}