angular.module('mytrex').controller('sideNavCtrl', function($scope, $timeout, $mdSidenav, $log, $location, $auth, $mdDialog){
      $scope.toggleLeft = buildDelayedToggler('left');
      $scope.toggleRight = buildToggler('right');
       $scope.isOpenRight = function(){
         return $mdSidenav('right').isOpen();
       };
      $scope.currentPath = $location.path();
      /**
       * Supplies a function that will continue to operate until the
       * time is up.
       */
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
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
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
          if(location === ''){
              $scope.hamburgerMenu = false;
          }
      }
      $scope.logout = function(){
      if (!$auth.isAuthenticated()) { return; }
      $auth.logout()
        .then(function() {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('')
              .textContent('You have been logged out')
              .ariaLabel('Label')
              .ok('close')
              .openFrom({top: -50, width: 100, height: 80})
              .closeTo({left: 1500})
            );
          $location.path('/');
        });
    }

    $scope.crtQty = "0";

})
