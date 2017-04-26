var ex = require("execute.js");

var userName = document.getElementById("user").innerHTML;
var password = document.getElementById("pass").innerHTML;

var signin = ex.user_login(userName, password);

if(!signin){
    console.log("Sign in not successful");
}

else{
    console.log("sign in successful");
}