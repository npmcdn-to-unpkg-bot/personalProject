angular.module('mytrex').controller('productCtrl', function($scope, service, $mdDialog, $location){
  $location.path();
  $scope.orderButton = "Add to Cart";


  // $scope.getUsers = function(){
  //   service.getUsers().then(function(response){
  //     $scope.users = response;
  //   });
  // };
  $scope.getProducts = function(){
    service.getProducts().then(function(response){
      $scope.products = response;
    });
  };

  $scope.cart = function(item, id, quantity){
    if(this.orderButton ==="Add to Cart"){
      if(!quantity){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Mytrex inc')
            .textContent('Must have quantity')
            .ariaLabel('Label')
            .ok('close')
            .openFrom({top: -50, width: 100, height: 80})
            .closeTo({left: 1500})
          );
        }
        else{
        service.addCart(item, id, quantity);
        this.orderButton = "Remove";
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Mytrex inc')
            .textContent('Added ' + quantity + ' ' + item + ' to cart')
            .ariaLabel('Label')
            .ok('close')
            .openFrom({top: -50, width: 30, height: 80
            }).closeTo({left: 1500})
        )
      }

    }
    else if(this.orderButton === "Remove"){
      this.orderButton = "Add to Cart";
      this.quantity = '';
    }
  }
  $scope.getProducts();
});
