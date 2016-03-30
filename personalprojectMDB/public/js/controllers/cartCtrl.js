angular.module('mytrex').controller('cartCtrl', function($scope, $timeout, $mdSidenav, $location, $auth, $mdDialog, $mdMedia, service, moment){
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
  $scope.removeItem = function(qty, itemId, itemName){
    service.removeItem(itemId).then(function(response){
      $scope.getUserCart();
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Mytrex inc')
          .textContent("removed "+qty+" "+itemName + " from cart")
          .ariaLabel('Label')
          .ok('close')
          .openFrom({top: -50, width: 100, height: 80})
          .closeTo({left: 1500})
        );
    })
  }
  $scope.showAdvanced = function(ev, part, id, qty) {
     var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../views/cartEdit.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals:{
        oldQty: qty,
        part: part,
        id: id
      }
    })
    .then(function(answer) {
      $scope.getUserCart();
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    function DialogController($scope, $mdDialog, oldQty, part, id) {
        $scope.oldQty = oldQty;
        $scope.part = part;
        $scope.id = id;
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          if(answer === 'cancel'){
            $mdDialog.hide(answer);
          }
          else if(answer === 'save'){
            $mdDialog.hide(answer);
          }
        };
        $scope.saveNewQty = function(newQty, Id){
          productObj = {
            "_id" : Id,
            "quantity" : newQty,
          }
          service.remove(productObj).then(function(response){

          })
        }
      }

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.submit = function(){
    $location.path('/checkout')
  }
  $scope.keepShopping = function(){
    $location.path('/store')
  }
  $scope.goToOrders = function(){
    $location.path('/orders')
  }
  $scope.submitOrder = function(){
    service.submitOrder().then(function(response){
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Mytrex inc')
          .textContent("Your order has been submitted")
          .ariaLabel('Label')
          .ok('close')
          .openFrom({top: -50, width: 100, height: 80})
          .closeTo({left: 1500})
        );
      $scope.getUserCart();
    });
  }
  $scope.getOrders = function(){
    service.getOrders().then(function(response){
      $scope.orders = response;
    });
  }
  $scope.getOrders();
  $scope.getUserCart();
})
