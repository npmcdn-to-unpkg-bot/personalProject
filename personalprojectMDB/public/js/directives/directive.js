angular.module('mytrex')
.directive('navDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/header.html',
    link: function (scope, element, attr) {
      scope.name = 'Zach';
      // scope.alertMe = function(){
      //   alert("me")
      // }
    }
  };
})
.directive('navFooter', function() {
  return{
    restrict: 'E',
    templateUrl: 'js/directives/footer.html'
  };

});
