angular.module('mytrex').controller('adminCtrl', function($scope, adminService, $mdDialog, $mdMedia){
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
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Mytrex inc')
            .textContent("User Added")
            .ariaLabel('Label')
            .ok('close')
            .openFrom({top: -50, width: 100, height: 80})
            .closeTo({left: 1500})
          );
        $scope.user.firstName = "";
        $scope.user.lastName = "";
        $scope.user.email = "";
        $scope.user.password = "";
        $scope.getUsers();
      }
      else{
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Mytrex inc')
            .textContent(response.data.message)
            .ariaLabel('Label')
            .ok('close')
            .openFrom({top: -50, width: 100, height: 80})
            .closeTo({left: 1500})
          );
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
