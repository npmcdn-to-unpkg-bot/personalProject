angular.module('mytrex').controller('adminCtrl', function($scope, adminService, $mdDialog, $mdMedia, toastr){
  $scope.adminCheck = false;

  $scope.getUsers = function(){
    adminService.getUsers().then(function(response){
      $scope.users = response;
    });
  };
  $scope.addUser = function(first, last, email, pass){
    if($scope.adminCheck === true) var type = "admin";
    else var type = "user";
    var user = {
      "firstName": first,
      "lastName": last,
      "email": email,
      "type": type,
      "password": pass
    };
    adminService.addUser(user).then(function(response){
      if(response.status !== 404){
        toastr.success('User Added');
        $scope.user.firstName = "";
        $scope.user.lastName = "";
        $scope.user.email = "";
        $scope.user.password = "";
        $scope.getUsers();
      }
      else{
        toastr.warning(response.data.message);
      }
    });
  };
  $scope.getOrdersAdmin = function(){
    adminService.getOrdersAdmin().then(function(response){
      $scope.orders = response;
    })
  }

  $scope.showUser = function(ev, uid){
    var userId = {
      '_id': uid
    }
    adminService.getUser(userId).then(function(response){
      var user = response
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
         $mdDialog.show({
           controller: DialogController,
           templateUrl: '../views/user.dialog.html',
           parent: angular.element(document.body),
           targetEvent: ev,
           clickOutsideToClose:true,
           locals:{
             thisUser: user
           }
         })
         .then(function(answer) {
          $scope.getUsers();
         }, function() {
          //  $scope.status = 'You cancelled the dialog.';
         });
         function DialogController($scope, $mdDialog, thisUser) {
           $scope.thisUser = thisUser;
           $scope.hide = function() {
             $mdDialog.hide();
           };
           $scope.cancel = function() {
             $mdDialog.cancel();
           };
           $scope.answer = function(answer) {
             if(answer === 'delete'){
               var userId = {
                 "_id" : user._id
               }
               adminService.deleteUser(userId).then(function(response){

               })
             }
             $mdDialog.hide();
           };
         }
         $scope.$watch(function() {
           return $mdMedia('xs') || $mdMedia('sm');
         }, function(wantsFullScreen) {
           $scope.customFullscreen = (wantsFullScreen === true);
         });
      })
    }


  $scope.getOrdersAdmin();
  $scope.getUsers();
});
