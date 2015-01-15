'use strict';

angular.module('clientApp').factory('FanModel', function($q, $http, FollowModel, FollowedByModel) {

  //
  // constructor
  //

  function FanModel() {

  }


  //find difference in arrays
  FanModel.prototype.findDifference = function(usersArray1, usersArray2) {
    var differenceKeyValue = {};

    //check if there is a mutual 'friends' relationship
    //ie user exists in both arrays
    for(var i=0; i<usersArray1.length; i++) {
      var friends = false;

      for(var j=0; j<usersArray2.length; j++) {
        if(usersArray1[i].id == usersArray2[j].id) {
          friends = true;
          continue;
        }
      }

      if(friends === false) {
        differenceKeyValue[ usersArray1[i].id ] = usersArray1[i];
      }
    }
    
    return differenceKeyValue;
  };  

  //
  // public
  //

  FanModel.prototype.all = function(userId) {
    var urlCalls = [
      FollowModel.all(userId),
      FollowedByModel.all(userId)
    ];

    var deferred = $q.defer();

    var self = this;

    $q.all(urlCalls).then(
      function(results) {
        var follows = results[0];
        var followedBy = results[1];
        
        var fans = self.findDifference(followedBy, follows);

        deferred.resolve(fans);
      },
      
      function() {
        deferred.reject();
      }
    );

    return deferred.promise;
  }

  return new FanModel();
});
