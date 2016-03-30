angular.module('mytrex').controller('loginCtrl', function($scope, adminService, $mdDialog, $location, $auth, service){

  $scope.check = function() {
      $auth.login($scope.user)
        .then(function() {
          $scope.isAuth = true;
          service.showStuff = true;
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

        });
    };
});
