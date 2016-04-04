angular.module('mytrex').controller('productCtrl', function($scope, service, $mdDialog, $location, $mdMedia, toastr){
  $scope.currentPath = $location.path();
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
          toastr.success(productObj.quantity+' '+productObj.item+' added to cart');
        });
        this.quantity = "";
      }

    }
  }

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './views/cart.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    }).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
  $scope.submit = function(){
    $location.path('/cart')
  }
  $scope.getProducts();
});
function DialogController($scope, $mdDialog, service, $location) {
  $scope.getUserCart = function(){
    service.getUserCart().then(function(response){
      $scope.userCart = response;
    })
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    if(answer === 'shop'){
      $mdDialog.hide(answer);
    }
    else{
      $mdDialog.hide(answer);
      $location.path('/checkout')
    }
  };
  $scope.editCart = function(){
    $mdDialog.hide();
    $location.path('/cart')
  }


  $scope.getUserCart();
}
