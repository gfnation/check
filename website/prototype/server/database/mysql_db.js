var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'dxbase.c0h9f8yfuf6w.us-west-2.rds.amazonaws.com',
  user     : 'chatadmin22',
  password : 'chatpassword22',
  database : 'firstdatabase'
});

exports.test = function(){
		connection.connect();
		
		connection.query('SELECT * FROM tb_users', function (err, rows, fields) {
		  if (err){
		  	throw err;
		  }

		  console.log("Success!");
		});

		connection.end();
};