angular.module('mytrex')
  .directive('navDirective', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/header.html',
      link: function(scope, element, attr) {
        scope.name = 'Zach';
        // scope.alertMe = function(){
        //   alert("me")
        // }
      }
    };
  })
  .directive('myEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.myEnter);
          });
          event.preventDefault();
        }
      })
    }
  })
  .directive('navFooter', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/footer.html'
    };
  })
  .directive('noCart', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/nocart.html',
      controller: 'orderCtrl'
    };
  })
  .directive('noOrders', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/noOrders.html',
      controller: 'orderCtrl'
    };
  })
  .directive('navSide', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/directives/sideNav.html',
      controller: 'sideNavCtrl'
    };
  });
