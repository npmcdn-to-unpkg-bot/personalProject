angular.module('mytrex').service('adminService', function($http) {

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: '/api/user'
    }).then(function(response) {
      return response.data;
    })
  };
  this.getUser = function(userId){
    return $http({
      method: 'POST',
      url: '/api/userId/',
      data: userId
    }).then(function(response){
      return response.data;
    })
  }
  this.deleteUser = function(userId){
    return $http({
      method: 'POST',
      url: '/api/userD',
      data: userId
    }).then(function(response){
      return response;
    }).catch(function(response){
      return response;
    })
  }
  this.addUser = function(user) {
    return $http({
      method: 'POST',
      url: '/api/user',
      data: user
    }).then(function(response) {
      //console.log(response)
      return response.data;
    }).catch(function(response){
      return response;
    })
  };
  this.check = function(email, password) {
    return $http({
      method: 'POST',
      url: '/api/user/id',
      data: user
    }).then(function(response) {
      return response.data;
    })
  };
  {
    this.getOrdersAdmin = function() {
      return $http({
        method: 'GET',
        url: '/api/orders/',
      }).then(function(response){
        return response.data
      })
    }
  }
});
