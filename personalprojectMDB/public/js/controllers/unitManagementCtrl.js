angular.module('mytrex').controller('unitManagementCtrl', function($scope, $rootScope, toastr, $timeout, unitService){
  $scope.showRaps = false
  $scope.user = null;
  $scope.users = null;
  $scope.loadTemplates = function() {
      $scope.templates = unitService.loadTemplates();

    // Use timeout to simulate a 650ms request.
    // return $timeout(function() {
    //   $scope.templates =  $scope.templates  || [
    //     { id: 1, name: 'Template 1' },
    //     { id: 2, name: 'Template 2' },
    //     { id: 3, name: 'Template 3' },
    //     { id: 4, name: 'Rescue Alert' }
    //   ];
    // }, 650);
  };
  $scope.data = {};
 $scope.data.cb1 = true;

 $scope.myData = {
  "SerialNumbers": {
      "123": [
          {
              "Owner": "Mr Happy"
          }
      ],
      "12345": [
          {
              "Owner": "Mr Red"
          }
      ],
      "45165": [
          {
              "Owner": "Mr Sad"
          }
      ],
      "4692": [
          {
              "Owner": "Mr Green"
          }
      ],
      "541": [
          {
              "Owner": "Mr Blue"
          }
      ],
      "D4554160N": [
          {
              "Owner": "Mr Loud"
          }
      ]
  }
};

$scope.results = [];

 $scope.searchID = function(str){
   angular.forEach($scope.myData.SerialNumbers, function(value, key){
      if (key === str) {
        $scope.results.push({serial: key, owner: value[0].Owner});
      }
   })
 }
 $scope.saveTemplate = function(){
   $scope.showRaps = false;
   toastr.success('Saved! (But not really, this is just to show what would happend if it actually did save)');
 }
 $scope.loadTemplates();
})
