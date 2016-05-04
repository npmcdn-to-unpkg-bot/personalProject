angular.module('mytrex').service('unitService', function($http, $auth){

  var Templates = [
      {
      "Name": "VRI-Part01- Alias - Avaunt Guard Line B",
      "General":
        {
          "BeepCounts": "10",
          "VoicePrompts": true,
          "CallingForHelpCount": 10,
          "CallingForHelpInterval": 10,
        }
      },
      {
      "Name": "Template2 - Rescue Alert Internet",
      "General":
        {
          "BeepCounts": "20",
          "VoicePrompts": false,
          "CallingForHelpCount": 20,
          "CallingForHelpInterval": 20,
        }
      }
    ]

    this.loadTemplates = function(){
      console.log(Templates)
      return Templates;
    }


});
