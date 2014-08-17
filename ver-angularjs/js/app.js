(function(){

  var app = angular.module('friendManager', ['ngRoute', 'ngCookies']);

  /*

  TODO:

  fix insta auth redir after timeout
  fix insta auth routing issues
  friendship toggle
  menu
  error handling / max requests handling
  user div styling - maybe small with hover
  switch button on hover might look nicer
  link to users profile on click in new window  

  */

  //routing!!!
  /* app.config(function($routeProvider, $locationProvider){

    $routeProvider.
      when('/', {
        templateUrl: 'template-users.html',
        controller: 'UsersCtrl'
      }).
      when('/auth/', {
        templateUrl: 'template-auth.html',
        controller: 'AuthCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

      //$locationProvider.html5Mode(true);
  }); 

  app.controller('AuthCtrl', ['$scope', '$location', '$routeParams', '$cookieStore', function($scope, $location, $routeParams, $cookieStore) {      

  }]); */

	app.controller('UsersCtrl', ['$scope', 'Instagram', '$http', '$window', '$cookieStore', '$location', function($scope, Instagram, $http, $window, $cookieStore, $location) {

    var access_code = $cookieStore.get("accessCode");

    var url = $location.url();

    //console.log('url - ' + url);

    if(access_code === undefined || url.indexOf('/access_token=') == -1)
    {
      //first we need to set the cookie so that we can get the access token :)
      var redirectUri = 'http://localhost/#/';

      var authorization_url = 'https://instagram.com/oauth/authorize/';
      authorization_url += '?client_id=0ed0e250ea854a129e9a849a8ee0ed9c';  
      authorization_url += '&response_type=token';      
      authorization_url += '&redirect_uri=' + redirectUri;
      authorization_url += '&scope=relationships';

      window.location.href = authorization_url;
    }
    else
    {
      var accessCode = url.replace('/access_token=', '');
      $cookieStore.put("accessCode", accessCode);
      $location.url('/');

    //TODO ^^^ Fix Auth

    $scope.toggleRelationship = function(user) {

      //TODO: Note - it looks like it will carry accross other array. cool.

      _.each($scope.users, function(u) {
        if(u.id == user.id)
        {          
          u.follow = !u.follow;
        }          
      });

    };

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
			else //if(groupId === 'idols')
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

    }

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

	//Communicates with Server
	app.service('Instagram', ['$http', '$q', '$cookieStore', function($http, $q, $cookieStore) {
		
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
      var accessCode = $cookieStore.get("accessCode");
      var userId = '183356248';
      var base = 'https://api.instagram.com/v1/users/' + userId + '/follows';
      var access_token = '?access_token=' + accessCode + '&callback=JSON_CALLBACK';
      var url = base + access_token;

      return _getUsers(_getUsers, url, '', []);
    }

    function getFollowedBy() {
      var accessCode = $cookieStore.get("accessCode");
      var userId = '183356248';
      var base = 'https://api.instagram.com/v1/users/' + userId + '/followed-by';
      var access_token = '?access_token=' + accessCode + '&callback=JSON_CALLBACK';
      var url = base + access_token;

      return _getUsers(_getUsers, url, '', []);
    }

    //Recursively fetch users from Instagram API
    function _getUsers(callback_fn, url, cursor, users) {

      var full_url = url + cursor;

      return $http.jsonp(full_url).then(
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