angular.module('mytrex').service('adminService', function($http) {

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:4545/api/user'
    }).then(function(response) {
      return response.data;
    })
  };
  this.getUser = function(userId){
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/userId/',
      data: userId
    }).then(function(response){
      return response.data;
    })
  }
  this.deleteUser = function(userId){
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/userD',
      data: userId
    }).then(function(response){
      return response.data;
    })
  }
  this.addUser = function(user) {
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/user',
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
      url: 'http://localhost:4545/api/user/id',
      data: user
    }).then(function(response) {
      return response.data;
    })
  };
  {
    this.getOrdersAdmin = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:4545/api/orders/',
      }).then(function(response){
        return response.data
      })
    }
  }
});
