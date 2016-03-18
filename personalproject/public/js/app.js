angular.module('mytrex', ['ui.router', 'ngMaterial'], function() {

})
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

      $stateProvider
        .state('home', {
              url: '/',
              templateUrl: 'views/homeTmpl.html',
              controller: 'controller'
          }).state('admin', {
                  url: '/admin',
                  templateUrl: 'views/adminTmpl.html',
                  controller: 'controller'
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
