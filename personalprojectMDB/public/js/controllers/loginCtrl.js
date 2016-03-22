angular.module('mytrex').controller('loginCtrl', function($scope, adminService, $mdDialog, $location){

  $scope.check = function(email, password){
    user = {
      "email":email,
      "password":password
    };
    adminService.check(user).then(function(response){
      if(response){
        $location.path('/store');
      }
      else{
        alert("Username or password was incorrect")
      }
    });
  }
});
