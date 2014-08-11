(function(){

	var app = angular.module('friendManager', ['ngRoute']);

	//routing!!!
	app.config(function($routeProvider){
		$routeProvider.
			when('/follows', {
				templateUrl: 'friends-follows.html',
				controller: 'FollowsCtrl'
			}).
			when('/followed-by', {
				templateUrl: 'friends-followed-by.html',
				controller: 'FollowedByCtrl'
			}).
			otherwise({
				redirectTo: '/follows'
			});
	});

	app.controller('FollowedByCtrl', ['$scope', 'Instagram', function($scope, Instagram){
		$scope.message = 'sup doggy';
	}]);	

	app.controller('FollowsCtrl', ['$scope', 'Instagram', '$http', function($scope, Instagram, $http){
		
		//init
		$scope.follows 				= [];
		$scope.follows_count 	= 0;

		Instagram.getFollowsArray()
			.then(function(datas){
				follows 		= datas[0];
				followedbys = datas[1];

				$scope.follows 				= findDifference(follows, followedbys);
				$scope.follows_count 	= dif.length;
			});

		//Find difference in arrays
		function findDifference(users_array1, users_array2)
		{			
			var difference_array = [];

			//Check if there is a mutual 'friends' relationship
			//ie user exists in both arrays
			for(var i=0; i<users_array1.length; i++)
			{
				var friends = false;

				for(var j=0; j<users_array2.length; j++)
				{
					if(users_array1[i].id == users_array2[j].id)
					{
						friends = true;
						continue;
					}
				}

				if(friends === false)
				{
					difference_array.push(users_array1[i]);
				}
			}
			
			return difference_array;
		};


		//Instagram.registerObserverCallback(updateFollows);

		/* loadFollows();

		function loadFollows(){
			Instagram.getFollows().then(function(users){
				$scope.follows 				= users;
				$scope.follows_count 	= users.length;
			});
		} */

	}]);

	//Communicates with Server
	app.service('Instagram', ['$http', '$q', function($http, $q){

		this.follows 		= [];
		this.followedby = [];

		//Public
		this.getFollowsArray = function(){
			return $q.all([
				_getFollows(_getFollows, '', []),
				_getFollowedBy(_getFollowedBy, '', [])
				]);
		}

		//Recursive private method
		function _getFollows(callback_fn, cursor, users){

			var base = 'https://api.instagram.com/v1/users/183356248/follows';
			var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
																				//183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3
			var url = base + access_token + cursor;

			return $http.jsonp(url).then(
				
				//success
				function(result){

					//add follow users from server to array
					users = users.concat(result.data.data);

					//check if more data needs to be retrieved from the server
					if(result.data.pagination.next_cursor)
					{
						//TODO: call again if more data to retrieve
						cursor = '&cursor=' + result.data.pagination.next_cursor;
						
						return callback_fn(callback_fn, cursor, users);
					}
					//all data fetched, return it
					else
					{
						return users;
					}
				},

				//error
				function(result){
					console.log('error');
				});
		};

		//Recursive private method
		function _getFollowedBy(callback_fn, cursor, users){

			var base = 'https://api.instagram.com/v1/users/183356248/followed-by';
			var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
			var url = base + access_token + cursor;

			return $http.jsonp(url).then(
				
				//success
				function(result){

					//add follow users from server to array
					users = users.concat(result.data.data);

					//check if more data needs to be retrieved from the server
					if(result.data.pagination.next_cursor)
					{
						//TODO: call again if more data to retrieve
						cursor = '&cursor=' + result.data.pagination.next_cursor;
						
						return callback_fn(callback_fn, cursor, users);
					}
					//all data fetched, return it
					else
					{
						return users;
					}
				},

				//error
				function(result){
					console.log('error');
				});
		};		









		//Recursive private method
		function _getFollowedBy(callback_fn, cursor, users){
			var base = 'https://api.instagram.com/v1/users/183356248/followed-by';
			var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
			var url = base + access_token + cursor;

			return $http.jsonp(url).then(
				
				//success
				function(result){

					//add follow users from server to array

					users = users.concat(result.data.data);

					//check if more data needs to be retrieved from the server
					if(result.data.pagination.next_cursor)
					{
						cursor = '&cursor=' + result.data.pagination.next_cursor;

						//TODO: call again if more data to retrieve
						return callback_fn(callback_fn, cursor, users);
					}
					//all data fetched, return it
					else
					{
						return users;
					}
				}, 

				//error
				function(result){
					console.log('error');
				});
		};		


		var observerCallbacks = [];

		this.registerObserverCallback = function(callback_fn){
			observerCallbacks.push(callback_fn);
		}

		var notifyObservers = function(){
    	angular.forEach(observerCallbacks, function(callback){
      	callback();
    	});
  	};	

	}]);






	/* app.service('Instagram', ['$http', function($http) { 

		this.follows = [];
		this.follows_count = this.follows.length;

		this.followedby = [];
		this.followedby_count = this.followedby.length;

		// TODO: how to make sequential $http calls to deal with pagination / limited return data from api
		//I'm using recursive callback_fn - this might be super sketchy...
		var server_get_follows = function(callback_fn, cursor) {

			var base = 'https://api.instagram.com/v1/users/183356248/follows';
			var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
			var url = base + access_token + cursor;

			$http.jsonp(url)
				.success(function(data){
					
					console.log('doh');

					/*this.follows = this.follows.concat(data.data);
					this.follows_count = this.follows.length;
					
					if(data.pagination.next_cursor)
					{
						cursor = '&cursor=' + data.pagination.next_cursor;

						//TODO: call again if more data to retrieve
						//callback_fn(callback_fn, cursor);
					}

				})
				.error(function(data){
					console.log('nooo');
				});
		};

		server_get_follows(server_get_follows, '');

		/* var server_get_followed_by = function(callback_fn, cursor) {

			var base = 'https://api.instagram.com/v1/users/183356248/followed-by';
			var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
			var url = base + access_token + cursor;

			$http.jsonp(url)
				.success(function(data){
					
					this.followedby = this.followedby.concat(data.data);
					this.followedby_count = this.followedby.length;
					
					if(data.pagination.next_cursor)
					{
						cursor = '&cursor=' + data.pagination.next_cursor;

						//TODO: call again if more data to retrieve
						callback_fn(callback_fn, cursor);
					}

				})
				.error(function(data){
					console.log('nooo');
				});
		};

		server_get_followed_by(server_get_followed_by, ''); */

		//find differences in the 2 arrays

		/* var fans = [];

		var follows_ids = this.follows.map(function(u){ return u.id })

		this.follows_ids = follows_ids; 

		
	}]); */

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

	/*app.factory('Instagram', ['$http', function($http) { 
		return { 
			'get_follows': function() {
				var url = 'https://api.instagram.com/v1/users/183356248/follows?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';

				//TODO: Using jsonp to solve cross domain issue. Api returns json, not jsonp - needed to specicfy additional callback attribute
				return $http.jsonp(url);
			}
		};
	}]);*/

	/*app.directive('friendsFollows', function(){
		return {
			restrict: 'E',
			templateUrl: 'friends-follows.html',
			//template: 'what the fuck is going on',
			controller: ['$scope', 'Instagram', function($scope, Instagram){

				/*$scope.follows = [];

				Instagram.get_follows()
					.success(function(data){
						console.log('success loaded friends follows');
						console.log(data);

						$scope.follows = data.data;
					})
					.error(function(data){
						console.log('errrrrr');
					});

				console.log('friends follows...');

				$scope.stupid = 'hello stupid';
			}],
			controllerAs: 'follows'
		};
	});

	app.directive('friendsFollowedBy', function(){
		return {
			restrict: 'E',
			templateUrl: 'friends-followed-by.html',
			controller: function(){
				console.log('shorty is so annoying');
			},
			controllerAs: 'followedby'
		};
	});

	app.directive('friendTabs', function(){
		return {
			restrict: 'E',
			templateUrl: 'friend-tabs.html',
			controller: function(){
				this.tab = 1;

				this.isSet = function(checkTab){
					return (this.tab === checkTab);
				};

				this.setTab = function(activeTab){
					this.tab = activeTab;
				};
			},
			controllerAs: 'tab'
		};
	});*/