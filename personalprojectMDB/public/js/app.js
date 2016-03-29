angular.module('mytrex', ['ngMaterial', 'ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'angularMoment'], function() {

})
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

      $stateProvider
        .state('login', {
          url: '/',
          templateUrl: 'views/loginTmpl.html',
          controller: 'loginCtrl',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('home', {
          url: '/store',
          templateUrl: 'views/homeTmpl.html',
          controller: 'productCtrl',
          resolve: {
           loginRequired: loginRequired
         }
        }).state('admin', {
          url: '/admin',
          templateUrl: 'views/adminTmpl.html',
          controller: 'adminCtrl',
          resolve: {
           loginRequired: loginRequired
         }
       }).state('cart', {
          url: '/cart',
          templateUrl: 'views/cartTmpl.html',
          controller: 'cartCtrl',
          resolve: {
           loginRequired: loginRequired
         }
        })
        .state('orders', {
           url: '/orders',
           templateUrl: 'views/ordersTmpl.html',
           controller: 'cartCtrl',
           resolve: {
            loginRequired: loginRequired
          }
         })
        .state('checkout', {
          url: '/checkout',
          templateUrl: 'views/submitOrder.html',
          controller: 'cartCtrl',
          resolve: {
           loginRequired: loginRequired
         }
        })
      $urlRouterProvider
          .otherwise('/');
          function skipIfLoggedIn($q, $auth) {
              var deferred = $q.defer();
              if ($auth.isAuthenticated()) {
                deferred.reject();
              } else {
                deferred.resolve();
              }
              return deferred.promise;
            }
          function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
              deferred.resolve();
            } else {
              $location.path('/');
            }
            return deferred.promise;
          }

  });
