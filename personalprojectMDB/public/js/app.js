angular.module('mytrex', ['ngMaterial', 'ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer', 'angularMoment'], function() {

})
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, toastrConfig) {
    angular.extend(toastrConfig, {
     autoDismiss: true,
     containerId: 'toast-container',
     maxOpened: 4,
     newestOnTop: true,
     positionClass: 'toast-bottom-right',
     preventDuplicates: false,
     preventOpenDuplicates: false,
     target: 'body',
     timeOut: 1500,
   }
  );
      $stateProvider
        .state('login', {
          url: '/',
          templateUrl: 'views/loginTmpl.html',
          controller: 'loginCtrl',
          resolve: {
            skipIfLoggedIn: skipIfLoggedIn
          }
        })
        .state('store', {
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
                $
                deferred.reject();
              } else {
                deferred.resolve();
              }
              return deferred.promise;
            }
          function loginRequired($q, $location, $auth, $rootScope, service) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
              service.getRole().then(function(role){
                if(role === 'admin'){
                    $rootScope.userRole = true;
                 }
                 else{
                     $rootScope.userRole = false;
                 }
              });
              $rootScope.isAuth = true;
              deferred.resolve();
            } else {
              $rootScope.isAuth = false;
              $location.path('/');
            }
            return deferred.promise;
          }

  });
