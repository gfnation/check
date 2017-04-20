var mysql = require("mysql");


//Will take on non-encripted message and encrypt it
function encrypt(message) {
    var x = 5;
    for (i = 0; i < message.length; i++){
        message = setCharAt(message, i, message.fromCharCode(message.charCodeAt(i) + x));
    }
    
    return message;
}