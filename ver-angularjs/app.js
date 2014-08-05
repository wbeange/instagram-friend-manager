(function(){
	var app = angular.module('friendManager', []);

	console.log('hello');

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
	});

	app.directive('friendsFollows', function(){
		return {
			restrict: 'E',
			templateUrl: 'friends-follows.html',
			controller: function(){
				
			},
			controllerAs: 'follows'
		};
	});

	app.directive('friendsFollowedBy', function(){
		return {
			restrict: 'E',
			templateUrl: 'friends-followed-by.html',
			controller: function(){

			},
			controllerAs: 'followedby'
		};
	});

})();