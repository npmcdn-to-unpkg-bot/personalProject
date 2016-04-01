angular.module('mytrex').controller('sideNavCtrl', function($scope, $timeout, $mdSidenav, $log, $location, $auth, $mdDialog, service, $rootScope, toastr){
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
       $scope.isOpenRight = function(){
         return $mdSidenav('right').isOpen();
       };
       $rootScope.isAuth = false;
       $rootScope.isAuth = true;

      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
              args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }

      function buildDelayedToggler(navID) {
        return debounce(function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
            //   $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }
      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
            //   $log.debug("toggle " + navID + " is done");
            });
        }
      }
      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            // $log.debug("close LEFT is done");
          });
      };
      $scope.closeR = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
      };

      $scope.goTo = function(location){
          $location.url('/'+location);
      }
      $scope.logout = function(){
      $rootScope.isAuth = false;
      if (!$auth.isAuthenticated()) { return; }
      $auth.logout()
        .then(function() {
          toastr.success('Logged out', 'Success');
          $location.path('/');
          $scope.currentPath = $location.path();
        });
    }
    $scope.check = function() {
        $auth.login($scope.user)
          .then(function(){
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
      $scope.navLinks = [{
         Title: 'store',
         LinkText: 'Store',
       }, {
         Title: 'orders',
         LinkText: 'Your Orders'
       }, {
         Title: 'cart',
         LinkText: 'Your Cart'
       }, {
         Title: 'admin',
         LinkText: 'Admin'
       }, {
         Title: 'logout',
         LinkText: 'Logout'
       }];

})
