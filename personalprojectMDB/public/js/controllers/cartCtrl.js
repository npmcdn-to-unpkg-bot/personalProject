angular.module('mytrex').controller('cartCtrl', function($scope, $timeout, $mdSidenav, $log, $location, $auth, $mdDialog, service){

  $scope.getUserCart = function(){
    service.getUserCart().then(function(response){
      $scope.itemsInCart = response;
    })
  };
  $scope.removeItem = function(qty, itemId, itemName){
    service.removeItem(itemId).then(function(){
      alert(" removed "+qty+" "+itemName + " from cart");
    })
  }
  $scope.editQty = function(){
  }
  $scope.getUserCart();
})
