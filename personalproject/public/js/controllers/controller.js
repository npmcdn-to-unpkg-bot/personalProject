angular.module('mytrex').controller('controller', function($scope, service, $mdDialog){

  $scope.orderButton = "Add to Cart";


  $scope.getUsers = function(){
    service.getUsers().then(function(response){
      $scope.users = response;
    });
  };
  $scope.getProducts = function(){
    service.getProducts().then(function(response){
      $scope.products = response;
    });
  };

  $scope.cart = function(item){
    if(this.orderButton ==="Add to Cart"){
      this.orderButton = "Remove from Cart";
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Title')
          .textContent('Text')
          .ariaLabel('Label')
          .ok('close')
          // Or you can specify the rect to do the transition from
          .openFrom({
            top: -50,
            width: 30,
            height: 80
          })
          .closeTo({
            left: 1500
          })
      );

    }
    else if(this.orderButton === "Remove from Cart"){
      this.orderButton = "Add to Cart";
    }
  }



  $scope.getProducts();
});
