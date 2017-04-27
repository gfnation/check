/*
	This is a CLASS in JavaScript.
	This is used to store three informations of a user
	This object is used in the functions found in the 'execute.js' file to represent users.
*/
module.exports = UserObject;

function UserObject(user_id, account_type, display_name) {
	this.user_id = user_id;
	this.account_type = account_type;
	this.display_name = display_name;

	this.get_display_name = function(){
		return this.display_name;
	}

	this.get_user_id = function(){
		return this.user_id;
	}

	this.get_account_type = function(){
		return this.account_type;
	}
}

/*
	Accessors
	Call the functions by invoking their names;
*/
/*
UserObject.prototype.get_display_name = function() {
	return this.display_name;
};

UserObject.prototype.get_user_id = function() {
	return this.user_id;
};

UserObject.prototype.get_account_type = function() {
	return this.account_type;
};
*/
