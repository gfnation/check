/*KevinC*/

var mysql = require("mysql");
var md5 = require("md5");
var sha256 = require("sha256");

/*
	Requires a database connection, username and a raw_password
	Returns an object containing information about a user
		- user id
		- display name
		- account type
	Returns false if an error has occured
*/
exports.user_login = function(connection, username, raw_password){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_users WHERE username=?";
		var user_info = false;
		connection.query(query, [username], function (err, rows, fields){
			if (err) {
				reject(err);
			}
			try {
				rows.forEach(function(element){
					var private_token = element['private_token'];
					var hashed_password = element['password'];
					var u_id = element['user_id'];
					var d_name = element['display_name'];
					var acc_type = element['account_type'];
					var match = password_match(raw_password, private_token, hashed_password);
					console.log(u_id + ":" + match);
					if (match) {
						user_info = {user_id : u_id, display_name: d_name, account_type: acc_type};
					}
					throw BreakException;
				});
			} catch(e){
			}
			resolve(user_info);
		});
	});
};

/*
	Creates a new user and returns the user_id of the new user.
	Returns false if user could not be created or already exists.
*/
exports.create_user = function(connection, display_name, username, raw_password, account_type){
	return username_exists(connection, username).then(function(result){
		if (!result) {
			var private_token = generate_private_token();
			var user_id = md5(private_token + raw_password);
			var hashed_password = hash_password(raw_password, private_token);

			var query = "INSERT INTO tb_users (user_id, display_name, username, password, account_type, private_token)" +
							"VALUES(?, ?, ?, ?, ?, ?)"
			connection.query(query, [user_id, display_name, username, hashed_password, account_type, private_token], 
				function(err, rows, fields){
					if (err) {
						return Promise.reject(err);
					}
				}
			);
			return Promise.resolve(user_id);
		}
		return Promise.resolve(false);
	});
};


/*
	Used to check if the username exists.
	Returns true if username exists.
*/
function username_exists(connection, username){
	return new Promise(function(resolve, reject){
		var query = "SELECT username FROM tb_users WHERE username=?";
		connection.query(query, [username], function(err, rows, fields){
			if (err) {
				 reject(err);
			} else {
				if (rows.length > 0) {
				 	resolve(true);
				} else {
					resolve(false);
				}
			}
		});
	});
}

/**
	Does password matching by hashing a raw_password concatenated with a private_token.
	Does a comparison with a passed in hashed_password and returns true if they are equal.
*/
function password_match(raw_password, private_token, hashed_password){
	var hashed_raw_password = hash_password(raw_password, private_token);
	return hashed_raw_password == hashed_password;
}

function hash_password(raw_password, private_token){
	return sha256(raw_password + private_token);
}

function generate_private_token(){
	return md5("" + Date.now());
}