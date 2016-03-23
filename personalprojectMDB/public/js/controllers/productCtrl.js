angular.module('mytrex').controller('productCtrl', function($scope, service, $mdDialog, $location){

  $location.path();
  $scope.orderButton = "Add to Cart";
  $scope.filters = true;

  $scope.getProducts = function(){
    service.getProducts().then(function(response){
      $scope.products = response;
    });
  };

  $scope.cart = function(item, id, quantity){
    var productObj = {
      "item": item,
      "_id": id,
      "quantity": quantity,
    }

    if(this.orderButton ==="Add to Cart"){
      if(!quantity || quantity <= 0){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Mytrex inc')
            .textContent('Please select a quantity')
            .ariaLabel('Label')
            .ok('close')
            .openFrom({top: -50, width: 100, height: 80})
            .closeTo({left: 1500})
          );
        }
        else{
        service.addCart(productObj).then(function(response){
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
        });
        this.orderButton = "Remove";
      }

    }
    else if(this.orderButton === "Remove"){
      if (!quantity) {
        qty = 0;
      } else {
        qty = quantity;
      }
      var removeObj = {
        "item": item,
        "_id": id,
        "quantity": qty
      }
      service.remove(removeObj).then(function(response){
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Mytrex inc')
            .textContent(response.data)
            .ariaLabel('Label')
            .ok('close')
            .openFrom({top: -50, width: 30, height: 80
            }).closeTo({left: 1500})
        )
      });
      this.orderButton = "Add to Cart";
      this.quantity = '';
    }
  }
  $scope.getProducts();
});
