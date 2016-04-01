angular.module('mytrex').controller('loginCtrl', function($scope, adminService, $mdDialog, $location, $auth, service, toastr, $rootScope){
  $rootScope.isAuth = false;
  $scope.check = function() {
      $auth.login($scope.user)
        .then(function() {
          $scope.isAuth = true;
          service.showStuff = true;
          toastr.success('Logged In', 'Success');
          $location.path('/store');
        })
        .catch(function(error) {
          toastr.error(error.statusText, 'Error');
        });
    };
});
