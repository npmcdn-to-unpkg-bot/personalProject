angular.module('mytrex').service('service', function($http){
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:4545/api/products'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getUserCart = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:4545/api/cart/'
    }).then(function(response) {
      return response.data;
    });
  };
  this.addCart = function(productObj) {
    //console.log(productObj._id + "Service");
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/cart/',
      data: productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.remove = function(productObj) {
    //console.log(productObj._id + "Service");
    return $http({
      method: 'PUT',
      url: 'http://localhost:4545/api/cart/',
      data: productObj
    }).then(function(response) {
      return response.data;
    });
  };
});
