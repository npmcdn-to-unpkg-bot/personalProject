angular.module('mytrex', ['ngMaterial', 'ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer'], function() {

})
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

      $stateProvider
        .state('login', {
          url: '/',
          templateUrl: 'views/loginTmpl.html',
          controller: 'loginCtrl',
          // resolve: {
          //   skipIfLoggedIn: skipIfLoggedIn
          // }
        })
        .state('home', {
          url: '/store',
          templateUrl: 'views/homeTmpl.html',
          controller: 'productCtrl'
        }).state('admin', {
          url: '/admin',
          templateUrl: 'views/adminTmpl.html',
          controller: 'adminCtrl'
        })
        .state('logout', {
          url: '/logout',
          template: null,
          controller: 'LogoutCtrl'
        })
          // .state('', {
          //     url: '',
          //     templateUrl: 'views/.html',
          //     controller: '',
          //     resolve: {
          //         : function(carService) {
          //             return carService.getCar();
          //         },
          //         : function(carsService, $stateParams) {
          //             return carService.getComments($stateParams.);
          //         }
          //     }
          // });
      $urlRouterProvider
          .otherwise('/');

      // function skipIfLoggedIn($q, $auth) {
      //     var deferred = $q.defer();
      //     if ($auth.isAuthenticated()) {
      //       deferred.reject();
      //     } else {
      //       deferred.resolve();
      //     }
      //     return deferred.promise;
      //   }
  });
