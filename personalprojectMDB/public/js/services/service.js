angular.module('mytrex').service('service', function($http, $auth){
  this.getRole = function(){
    console.log()
    return $http({
      method: 'GET',
      url: '/api/role'
    }).then(function(response){
      return response.data;
    })
  }
  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/api/products'
    }).then(function(response) {
      return response.data;
    });
  };
  this.getUserCart = function() {
    return $http({
      method: 'GET',
      url: '/api/cart/'
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
      url: '/api/cart/',
      data: productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.remove = function(productObj) {
    return $http({
      method: 'PUT',
      url: '/api/cart/',
      data: productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.removeItem = function(productObj){
    return $http({
      method: 'DELETE',
      url: '/api/cart/'+productObj
    }).then(function(response) {
      return response.data;
    });
  };
  this.submitOrder = function(){
    return $http({
      method: 'POST',
      url: '/api/order'
    }).then(function(response){
      return response.data;
    })
  };
  this.getOrders = function(){
    return $http({
      method: 'GET',
      url: '/api/order'
    }).then(function(response){
      return response;
    }).catch(function(response){
      return response
    })
  };
});
