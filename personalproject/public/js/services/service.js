angular.module('mytrex').service('service', function($http){

this.getUsers = function(){
        return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/users'
        }).then(function(response){
          return response.data;
        });
    };
    this.getProducts = function(){
            return $http({
              method: 'GET',
              url: 'http://localhost:3000/api/product'
            }).then(function(response){
              return response.data;
            });
        };
});
