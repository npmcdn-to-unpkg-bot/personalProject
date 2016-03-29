angular.module('mytrex').controller('adminCtrl', function($scope, adminService, $mdDialog){
  $scope.adminCheck = false;

  $scope.getUsers = function(){
    adminService.getUsers().then(function(response){
      $scope.users = response;
    });
  };
  $scope.addUser = function(first, last, email, pass){
    if($scope.adminCheck === true) var type = "admin";
    else var type = "user";
    var user = {
      "firstName": first,
      "lastName": last,
      "email": email,
      "type": type,
      "password": pass
    };
    adminService.addUser(user).then(function(response){
      alert("User Added");
      $scope.user.firstName = "";
      $scope.user.lastName = "";
      $scope.user.email = "";
      $scope.user.password = "";
    })
  };
  $scope.getOrdersAdmin = function(){
    adminService.getOrdersAdmin().then(function(response){
      $scope.orders = response;
    })
  }
  $scope.getOrdersAdmin();
  $scope.getUsers();
});
