var mysql = require("mysql");
var md5 = require("md5");

exports.create_invitation = function(connection, user_id){
	return new Promise(function(resolve, reject){
		var query = "INSERT INTO tb_invitations (invitation_id, user_id, invitation_key, status), VALUES(?, ?, ?, ?)";
		var invitation_id = "";
		var invitation_key = "";

		connection.query(query, [invitation_id, user_id], function(err, results, fields){
			if (err) {

			} else {
				resolve();
			}
		});
	});
}

/*
	Returns user_id of the invitation initator
*/
exports.claim_invitation = function(connection, invitation_key){
	return user_id_from_key(connection, invitation_key).then(function(result){
		
		var user_id = result;
		var query = "UPDATE tb_invitations WHERE invitation_key=? AND user_id=?"
		connection.query(query, [invitation_key, user_id], function(err, result){
			if (err) {
				reject(err);
			} else {
				resolve(user_id;);
			}
		});
	});
}

function user_id_from_key(connection, invitation_key){
	return new Promise(function(resolve, reject){
		var query = "SELECT * from tb_invitations WHERE invitation_key=?";

		query.connection(query, [invitation_key], function(err, results, fields){
			if (err) {
				reject(err);
			} else {
				var user_id;

				resolve(user_id);
			}
		});
	});
};

function create_key(user_id){
	return md5(user_id + Date.now());
}

function generate_key(){
	return new Promise(function(resolve, reject){
		var query = "SELECT * FROM tb_invitations WHERE invitation_key=?";

		
	});
}