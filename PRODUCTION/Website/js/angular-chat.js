var app = angular.module("chat_app", []);
app.controller("main_controller", function ($scope, $http) {

    var u_id = localStorage.getItem("user_id");

    $scope.all_users = [];
    $scope.active_user_id = u_id;
    $scope.active_target_display_name = "";
    $scope.active_target_user_id = "";

    $scope.active_conversation_id = null;

    $scope.userlist = [];
    $scope.feed = [];


    //Message+User Retrieval loop.    
    var time = 0;
    var interval = setInterval(function () {
        if (time <= 500) {
            $scope.load_users_all();
            $scope.load_users();
            if($scope.active_conversation_id){
                $scope.get_messages();
            }
            time++;
        }
        else {
            clearInterval(interval);
        }
    }, 2250);

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
                message.source_name = $scope.user_name_by_id(message.source_id);
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
                //console.log(user);
                user_array.push(user);
            }
            $scope.userlist = user_array;
        });
    };

    $scope.load_users_all = function () {
        $http.get('http://localhost:8080/api/get_users_all').then(function (data) {
            var user_array = [];
            for (var i = 0; i < data.data.users.length; i++) {
                var user = data.data.users[i];
                console.log(user);
                user_array.push(user);
            }
            $scope.all_users = user_array;
            console.log($scope.all_users);
        });
    };

    $scope.set_conversation = function(target_user_id){
        $scope.active_target_user_id = target_user_id;
        $scope.active_target_display_name = $scope.user_name_by_id(target_user_id);

        $http.get('http://localhost:8080/api/create_conversation', {
            params: {
                user_id : $scope.active_user_id,
                user_id2 : target_user_id
            }
        }).then(function (data) {
            var conversation_id =  data.data.conversation_id;
            $scope.active_conversation_id = conversation_id;
            console.log(conversation_id);
            $scope.feed = [];
        });
    }

    $scope.user_name_by_id = function(user_id){
        for (var i = 0; i < $scope.all_users.length; i++) {
            if ($scope.all_users[i].user_id == user_id) {
                return $scope.all_users[i].display_name;
            }
        };
        return "Display-Name-Errored";
    }
});