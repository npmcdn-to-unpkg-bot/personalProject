angular.module('mytrex').service('adminService', function($http) {

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:4545/api/user'
    }).then(function(response) {
      console.log(response)
      return response.data;
    })
  };
  this.addUser = function(user) {
    return $http({
      method: 'POST',
      url: 'http://localhost:4545/api/user',
      data: user
    }).then(function(response) {
      return response.data;
    })
  };
});
