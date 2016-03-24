angular.module('mytrex').controller('cartCtrl', function($scope, $timeout, $mdSidenav, $location, $auth, $mdDialog, $mdMedia, service){
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
  $scope.showAdvanced = function(ev) {
    // var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../views/cartEdit.dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  $scope.saveNewQty = function(newQty){
    console.log(newQty)
    //service.saveNewQty($scope.newQuantity).then
  }
  $scope.editQty = function(){
  }

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

  $scope.getUserCart();
})
