(function(){

	//cookies!

  var app = angular.module('friendManager', ['ngRoute']);

	app.controller('UsersCtrl', ['$scope', 'Instagram', '$http', function($scope, Instagram, $http) {
			
		$scope.loadUsers = function(groupId) {
			if(groupId === 'follows')
			{
				$scope.users = $scope.follows;
				$scope.usersCount = $scope.followsCount;
			}
			else if(groupId === 'followedBy')
			{
				$scope.users = $scope.followedBy;
				$scope.usersCount = $scope.followedByCount;
			}
			else if(groupId === 'fans')
			{
				$scope.users = $scope.fans;
				$scope.usersCount = $scope.fansCount;
			}
			else
			{
				$scope.users = $scope.idols;
				$scope.usersCount = $scope.idolsCount;
			}
		};

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

		/* $scope.users = [{
				username: "xococoho",
				bio: "Professional Surfer from Hawaii 🐬 (everything I wear is @VolcomWomens) Trust.Honor.Loyalty.Love",
				website: "http://www.usatoday.com/media/cinematic/video/13364719/surfer-coco-ho-on-appearing-in-espn-body-issue/",
				profile_picture: "http://photos-c.ak.instagram.com/hphotos-ak-xaf1/10601766_747458748625730_1526191873_a.jpg",
				full_name: "Coco Ho",
				id: "10908579"				
			}]; */

		//load variables
		Instagram.getRelationshipData().then(function(data) {			
			follows = data[0];
			followedBy = data[1];

			$scope.follows = follows;
			$scope.followsCount = follows.length;

			$scope.followedBy = followedBy;
			$scope.followedByCount = followedBy.length;

			$scope.fans = findDifference(follows, followedBy);
			$scope.fansCount = $scope.fans.length;

			$scope.idols = findDifference(followedBy, follows);
			$scope.idolsCount = $scope.idols.length;

			$scope.loadUsers('follows');

		});


		//find difference in arrays
		var findDifference = function(usersArray1, usersArray2) {			
			var differenceArray = [];

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
					differenceArray.push(usersArray1[i]);
				}
			}
			
			return differenceArray;
		};

	}]);

	//Communicates with Server
	app.service('Instagram', ['$http', '$q', function($http, $q) {
		
		//
    //Public
    //

    this.getRelationshipData = function() {

			return $q.all([
				getFollows(),
				getFollowedBy()
				]);
		}

    //
    //Private
    //

    function getFollows() {            
      var userId = '183356248';
      var base = 'https://api.instagram.com/v1/users/' + userId + '/follows';
      var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
      var url = base + access_token;

      return _getUsers(_getUsers, url, '', []);
    }

    function getFollowedBy() {
      var userId = '183356248';
      var base = 'https://api.instagram.com/v1/users/' + userId + '/followed-by';
      var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
      var url = base + access_token;

      return _getUsers(_getUsers, url, '', []);
    }

    //Recursively fetch users from Instagram API
    function _getUsers(callback_fn, url, cursor, users) {

      return $http.jsonp(url+cursor).then(
        //success
        function(result) {

          //add follow users from server to array
          users = users.concat(result.data.data);

          //check if more data needs to be retrieved from the server
          if(result.data.pagination.next_cursor)
          {
            cursor = '&cursor=' + result.data.pagination.next_cursor;
            
            return callback_fn(callback_fn, url, cursor, users);
          }
          else
          {
            return users;
          }
        }
      )};

	}]);

})();


	/*

	TODO: When user goes to app for first time
	- need to authenticate to get access token by doing external redirect to instagram authentication
	- need to handle redirect somehow

	var access_token = null;

	if(!access_token)
	{
		var authorization_url = 'https://instagram.com/oauth/authorize/';
		authorization_url += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';
		authorization_url += '&redirect_uri=http://localhost:8888/instagram-callback';
		authorization_url += '&response_type=token';
		authorization_url += '&scope=relationships';		

		window.location.replace(authorization_url);

		//var access_token = '183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3';
	}
	else
	{

	} */