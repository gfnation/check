var app = angular.module("chat_app", []);
app.controller("signup_controller", function ($scope, $http) {
        
    $scope.signup = function(){
        var raw_username = $scope.username_field;
        var raw_password = $scope.password_field;
        var raw_display_name = $scope.display_field;
        
        $http.get("http://localhost:8080/api/create_user", {
            params: {
                display_name : raw_display_name,
                username: raw_username,
                password: raw_password,
                type: 1
            }
        }).then(function (data) {
            var result = data.data.response;
            if(result){
                document.location.href = "index.html";
            } else {
                alert("User already exists or ERR");
            }
        });
    };
});