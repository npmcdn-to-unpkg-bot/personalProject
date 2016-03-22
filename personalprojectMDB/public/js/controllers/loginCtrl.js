angular.module('mytrex').controller('loginCtrl', function($scope, adminService, $mdDialog, $location, $auth){

  $scope.check = function() {
    //console.log($scope.user)
      $auth.login($scope.user)
        .then(function() {
          //alert('You have successfully signed in!');
          $location.path('/store');
        })
        .catch(function(error) {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title(error.status)
              .textContent(error.data.message)
              .ariaLabel('Label')
              .ok('close')
              .openFrom({top: -50, width: 100, height: 80})
              .closeTo({left: 1500})
            );
          // /alert(error.data.message + " " + error.status);
        });
    };

  // $scope.check = function(email, password){
  //   user = {
  //     "email":email,
  //     "password":password
  //   };
  //   adminService.check(user).then(function(response){
  //     if(response){
  //       $location.path('/store');
  //     }
  //     else{
  //       alert("Username or password was incorrect")
  //     }
  //   });
  // }
});
