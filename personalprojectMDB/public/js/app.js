angular.module('mytrex', ['ui.router', 'ngMaterial'], function() {

})
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

      $stateProvider
        .state('login', {
              url: '/',
              templateUrl: 'views/loginTmpl.html',
              controller: 'loginCtrl'
        })
        .state('home', {
              url: '/store',
              templateUrl: 'views/homeTmpl.html',
              controller: 'productCtrl'
        }).state('admin', {
                url: '/admin',
                templateUrl: 'views/adminTmpl.html',
                controller: 'adminCtrl'
        });
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
  });
