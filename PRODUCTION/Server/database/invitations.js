/*KevinC*/
var mysql = require("mysql");
var md5 = require("md5");

/*
	Incomplete.
	Do not use.
*/

/*
	Creates a invitation_key linked to a user and returns the invitation_key
*/
exports.create_invitation = function(connection, user_id){
	return generate_key(function(new_key){
		var query = "INSERT INTO tb_invitations (invitation_id, user_id, invitation_key, status), VALUES(?, ?, ?, ?)";

		var invitation_key = new_key;
		var invitation_id = md5(user_id + new_key);

		connection.query(query, [invitation_id, user_id, new_key, 1], 
			function(err, results, fields){
				if (err) {
					return Promise.reject(err);
				} else {
					return Promise.resolve(invitation_key);
				}
			}
		);
	});
}

/*
	Returns user_id of the invitation initator
*/
exports.claim_invitation = function(connection, invitation_key){
	return user_id_from_key(connection, invitation_key).then(function(result){
		var user_id = result;
		var new_status = 0;
		var active_status = 1;
		var query = "UPDATE tb_invitations (status), VALUES(?) WHERE invitation_key=? AND user_id=? && status=?"

		connection.query(query, [new_status, invitation_key, user_id, active_status], function(err, result){
			if (err) {
				return Promise.reject(err);
			}
		});
		return Promise.resolve(user_id);
	});
}

function user_id_from_key(connection, invitation_key){
	return new Promise(function(resolve, reject){
		var query = "SELECT * from tb_invitations WHERE invitation_key=?";

		connection.query(query, [invitation_key], function(err, results, fields){
			if (err) {
				reject(err);
			} else {
				var user_id;
				resolve(user_id);
			}
		});
	});
};

/*
	Creates a simple key
*/

function create_key(user_id){
	return md5(user_id + Date.now());
}

function generate_key(connection, user_id){
	return new Promise(function(resolve, reject){
		var output_key = create_key(user_id);
		var valid = false;
		while(!valid){
			var query = "SELECT * FROM tb_invitations WHERE invitation_key=?";
			connection.query(query, [output_key], function(err, result){
				if (err) {
					reject(err);
				} else {
					var size = result.length;
					if (size == 0) {
						valid = true;
						resolve(output_key);
					} else {
						output_key = create_key(user_id);
					}
				}
			});
		}
	});
}