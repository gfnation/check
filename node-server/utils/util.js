var md5 = require("md5");


exports.md5_timed = function(string){
	return md5(string + Date.now());
};