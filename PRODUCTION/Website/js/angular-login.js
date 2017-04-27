var app = angular.module("chat_app", []);
app.controller("login_controller", function ($scope, $http) {
        
    $scope.login = function(){
        var raw_username = $scope.username_field;
        var raw_password = $scope.password_field;
        
        $http.get("http://localhost:8080/api/login", {
            params: {
                username: raw_username,
                password: raw_password
            }
        }).then(function (data) {
            var result = data.data.response;
            if(result){
                var user_id = result.user_id;
                localStorage.setItem("user_id", user_id);
                document.location.href = "chat.html";
                console.log(user_id);
            } else {
                alert("Invalid Login Information");
            }
            
        });
    };
    
});