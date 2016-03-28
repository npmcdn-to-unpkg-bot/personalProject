angular.module('mytrex').controller('orderCtrl', function($scope, $timeout, $mdSidenav, $location, $auth, $mdDialog, $mdMedia, service){
  $scope.noCart = false;
  $scope.getUserCart = function(){
    service.getUserCart().then(function(response){
      if(response === 204){
        $scope.itemsInCart = "";
        $scope.noCart = true;
      }
      else {
        $scope.noCart = false;
        $scope.itemsInCart = response;
      }
    })

  };
  $scope.getUserCart();
})
