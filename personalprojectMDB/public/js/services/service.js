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
      if(response.status === 204){
        return response.status;
      }
      return response.data;
    });
  };
  this.addCart = function(productObj) {
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/cart/',
      data: productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.remove = function(productObj) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:4545/api/cart/',
      data: productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.removeItem = function(productObj){
    return $http({
      method: 'DELETE',
      url: 'http://localhost:4545/api/cart/'+productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.submitOrder = function(){
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/order'
    }).then(function(response){
      return response.data;
    })
  };
  this.getOrders = function(){
    return $http({
      method: 'GET',
      url: 'http://localhost:4545/api/order'
    }).then(function(response){
      return response.data;
    })
  };
});
