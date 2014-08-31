'use strict';

angular.module('friendManager.controllers').controller('InstagramCtrl', ['$scope', 'Instagram', '$http', '$window', '$cookieStore', '$location', function($scope, Instagram, $http, $window, $cookieStore, $location) {

  console.log('users ctrl');

  //init variables
  $scope.users = [];
  $scope.usersCount = 0;

  $scope.follows = [];
  $scope.followsCount = 0;

  $scope.followedBy = [];
  $scope.followedByCount = 0;

  $scope.fans = [];
  $scope.fansCount = 0;

  $scope.idols = [];
  $scope.idolsCount = 0;  

  $scope.toggleRelationship = function(user) {

    //TODO: Note - it looks like it will carry accross other array. cool.

    _.each($scope.users, function(u) {
      if(u.id == user.id) {
        u.follow = !u.follow;
      }
    });

  };

  $scope.loadUsers = function(groupId) {
    if(groupId === 'follows')
    {
      $scope.users = $scope.follows;
      $scope.usersCount = "You follow " + $scope.followsCount + " people.";
    }
    else if(groupId === 'followedBy')
    {
      $scope.users = $scope.followedBy;
      $scope.usersCount = $scope.followedByCount + " people follow you.";
    }
    else if(groupId === 'fans')
    {
      $scope.users = $scope.fans;
      $scope.usersCount = $scope.fansCount + " people follow you that you don't follow back.";
    }
    else //if(groupId === 'idols')
    {
      $scope.users = $scope.idols;
      $scope.usersCount = "You follow " + $scope.idolsCount + " people that don't follow you back.";
    }
  };

  // $scope.users = [{
  //     username: "xococoho",
  //     bio: "Professional Surfer from Hawaii 🐬 (everything I wear is @VolcomWomens) Trust.Honor.Loyalty.Love",
  //     website: "http://www.usatoday.com/media/cinematic/video/13364719/surfer-coco-ho-on-appearing-in-espn-body-issue/",
  //     profile_picture: "http://photos-c.ak.instagram.com/hphotos-ak-xaf1/10601766_747458748625730_1526191873_a.jpg",
  //     full_name: "Coco Ho",
  //     id: "10908579"        
  //   }];

  //load variables
  Instagram.getRelationshipData().then(function(data) {
    var follows = data[0];
    var followedBy = data[1];

    var fans = findDifference(followedBy, follows);
    var idols = findDifference(follows, followedBy);

    _.each(follows, function(u) {
      u.follow = true;
    });

    _.each(followedBy, function(u) {
      if(_.has(fans, u.id) === true)
        u.follow = false;
      else
        u.follow = true;
    });

    _.each(fans, function(u) {
      u.follow = false;
    });

    _.each(idols, function(u) {
      u.follow = true;
    });

    $scope.follows = follows;
    $scope.followsCount = follows.length;

    $scope.followedBy = followedBy;
    $scope.followedByCount = followedBy.length;

    $scope.fans = fans;
    $scope.fansCount = _.size(fans);

    $scope.idols = idols;
    $scope.idolsCount = _.size(idols);

    $scope.loadUsers('follows');

  });

  //find difference in arrays
  var findDifference = function(usersArray1, usersArray2) {
    var differenceKeyValue = {};

    //check if there is a mutual 'friends' relationship
    //ie user exists in both arrays
    for(var i=0; i<usersArray1.length; i++)
    {
      var friends = false;

      for(var j=0; j<usersArray2.length; j++)
      {
        if(usersArray1[i].id == usersArray2[j].id)
        {
          friends = true;
          continue;
        }
      }

      if(friends === false)
      {
        //differenceArray.push(usersArray1[i]);
        differenceKeyValue[ usersArray1[i].id ] = usersArray1[i];
      }
    }
    
    return differenceKeyValue;
  };

}]);