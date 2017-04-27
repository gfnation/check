var app = angular.module("chat_app", []);
app.controller("main_controller", function ($scope, $http) {

    $scope.active_display_name = "Display Name";
    $scope.active_user_id = "632192029099df247f500b857a35b883";
    $scope.active_conversation_id = "fb0250eb8d439defa91d2433e06f3dec";

    $scope.userlist = [];
    $scope.feed = [];

    //Message Retrieval loop.
    var time = 0;
    var interval = setInterval(function () {
        if (time <= 500) {
            $scope.get_messages();
            time++;
        }
        else {
            clearInterval(interval);
        }
    }, 3000);

    var time2 = 0;
    var interval2 = setInterval(function () {
        if (time2 <= 500) {
            load_users();
            time2++;
        }
        else {
            clearInterval(interval2);
        }
    }, 2000);

    $scope.send_message = function () {
        $http.get("http://localhost:8080/api/send_message", {
            params: {
                conversation_id: $scope.active_conversation_id,
                user_id: $scope.active_user_id,
                message: $scope.chat_text
            }
        }).then(function (data) {
            $scope.chat_text = "";
        });
    };

    $scope.get_messages = function () {
        $http.get('http://localhost:8080/api/get_messages', {
            params: {
                conversation_id: $scope.active_conversation_id
            }
        }).then(function (data, status, headers, config) {
            $scope.feed = [];
            var message_entry_array = [];
            for (var i = 0; i < data.data.messages.length; i++) {
                var message = data.data.messages[i];
                //console.log(message);
                message.short_id = message.source_id.substring(0, 5);
                message_entry_array.push(message);
            }
            $scope.feed = message_entry_array;
        });
    };

    $scope.load_users = function () {
        $http.get('http://localhost:8080/api/get_users', {
            params: {
                user_id: $scope.active_user_id
            }
        }).then(function (data) {
            var user_array = [];
            for (var i = 0; i < data.data.users.length; i++) {
                var user = data.data.users[i];
                console.log(user);
                user_array.push(user);
            }
            $scope.userlist = user_array;
        });
    };

    $scope.select_conversation = function () {
        $scope.active_conversation_id = "fb0250eb8d439defa91d2433e06f3dec";
    };

    function load_users() {
        $scope.load_users();
    }
    $scope.somefunction = function(value) {
        console.log(value);    
    }
    
    
});