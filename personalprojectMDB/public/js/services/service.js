angular.module('mytrex').service('service', function($http){
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:4545/api/products'
    }).then(function(response) {
      return response.data;
    });
  };
  // this.addCart = function(item, id, quantity) {
  //   console.log(item, id, quantity);
  // //   return $http({
  // //     method: 'POST',
  // //     url: 'http://localhost:4545/api/products/cart'
  // //     data:
  // //   }).then(function(response) {
  // //     return response.data;
  // //   });
  // };
});
