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

	app.controller('FollowsCtrl', ['$scope', 'Instagram', '$http', function($scope, Instagram, $http){
		
		$scope.follows = Instagram.getFollowsArray();
		$scope.follows_count = 0;

		$scope.follow_user = function(user_id){
			
		}

		$scope.unfollow_user = function(user_id){

		}

	}]);

	app.controller('FollowedByCtrl', ['$scope', 'Instagram', function($scope, Instagram){
		$scope.message = 'sup doggy';
	}]);

	app.service('Instagram', ['$http', function($http) { 

		this.follows = [];
		this.follows_count = this.follows.length;

		/* TODO: how to make sequential $http calls to deal with pagination / limited return data from api
		//I'm using recursive callback_fn - this might be super sketchy...
		var server_get_follows = function(callback_fn, cursor) {

			var base = 'https://api.instagram.com/v1/users/183356248/follows';
			var access_token = '?access_token=183356248.0ed0e25.b2d54d90e2724be484f172484d92ace3&callback=JSON_CALLBACK';
			var url = base + access_token + cursor;

			$http.jsonp(url)
				.success(function(data){
					
					this.follows = this.follows.concat(data.data);
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

		server_get_follows(get_follows, ''); */

		this.follows = [{"username":"ckristo","bio":"\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800VAN\u2022CITY\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800 \u2800\u2800\u24dd\u24d8\u24da\u24de\u24dd \u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\ud83c\udf4f\u2800\u2800\u2800 \u2800\u2800 \u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u1d40\u1d3f\u02b8\u1d35\u1d3a\u1d33 \u1d40\u1d3c \u1d33\u1d31\u1d40 \u1d2e\u1d2c\u1d9c\u1d37 \u1d40\u1d3c \u1d39\u02b8 \u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800 \u2800\u1d3e\u1d38\u1d2c\u1d3a\u1d31\u1d40","website":"http:\/\/ckristophoto.com","profile_picture":"http:\/\/photos-d.ak.instagram.com\/hphotos-ak-xfa1\/914426_1442530972687299_715656577_a.jpg","full_name":"\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800  \u265b","id":"1248686324"},{"username":"colourwear","bio":"With our dedicated team of creative and driven friends who form the CLWR family, we develop and build garments to fit their needs. #clwr","website":"http:\/\/CLWR.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_40833944_75sq_1386154248.jpg","full_name":"Colour Wear","id":"40833944"},{"username":"whitey_12","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_27504399_75sq_1365459446.jpg","full_name":"Jordan White","id":"27504399"},{"username":"melaniesmitty","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_22213543_75sq_1359836568.jpg","full_name":"Melanie","id":"22213543"},{"username":"eisensarah","bio":"","website":"","profile_picture":"http:\/\/photos-e.ak.instagram.com\/hphotos-ak-xpa1\/926837_1444842662446812_1234185633_a.jpg","full_name":"Sarah Eisen","id":"550218507"},{"username":"tessalbury","bio":"","website":"","profile_picture":"http:\/\/photos-h.ak.instagram.com\/hphotos-ak-xfp1\/10369282_813962055283775_993517766_a.jpg","full_name":"tessalbury","id":"17799300"},{"username":"abblivion","bio":"","website":"","profile_picture":"http:\/\/photos-d.ak.instagram.com\/hphotos-ak-xpa1\/10471868_1487944088107795_1916540790_a.jpg","full_name":"","id":"11727792"},{"username":"devinshan","bio":"Devin Shanaman \ud83d\udc78\ud83d\udc9c\ud83c\udf80","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_178381016_75sq_1365186252.jpg","full_name":"devinshan","id":"178381016"},{"username":"ksartor","bio":"#tallman","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_11872428_75sq_1378140200.jpg","full_name":"ksartor","id":"11872428"},{"username":"athinkingape","bio":"we build great games \/\/ visual gallery of what life is like at #athinkingape","website":"http:\/\/www.athinkingape.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_146174317_75sq_1399409496.jpg","full_name":"A Thinking Ape","id":"146174317"},{"username":"davideblake","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/anonymousUser.jpg","full_name":"","id":"145937620"},{"username":"theraumproject","bio":"_______\u25b3lighting\u2022furniture\u2022spaces\u25b3 _______ \n| f a m i l y m a d e |theraumproject@gmail.com for order info","website":"","profile_picture":"http:\/\/photos-c.ak.instagram.com\/hphotos-ak-xpf1\/10474957_729212260457706_1722621652_a.jpg","full_name":"","id":"1407804840"},{"username":"jordysmith88","bio":"","website":"http:\/\/vimeo.com\/100257222","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_6156937_75sq_1394964132.jpg","full_name":"Jordy Smith","id":"6156937"},{"username":"afterlightapp","bio":"Official account of Afterlight. Tag your photos with #afterlight for a chance to be featured. We'll be posting our favorites!","website":"http:\/\/afterlight.us","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_654741858_75sq_1389315557.jpg","full_name":"Afterlight","id":"654741858"},{"username":"scottfulton19","bio":"","website":"","profile_picture":"http:\/\/photos-d.ak.instagram.com\/hphotos-ak-xfa1\/914743_766281790059627_1273346106_a.jpg","full_name":"Scott Fulton","id":"1389832973"},{"username":"kbbennett","bio":"we all start as strangers \ud83c\udf1b\ud83c\udf1e","website":"","profile_picture":"http:\/\/photos-f.ak.instagram.com\/hphotos-ak-xpa1\/1740866_746266245431221_1786475053_a.jpg","full_name":"K R I S T I N A  B L A I R","id":"3701989"},{"username":"fnez","bio":"Epic Travel Alters Perspective\nWe are travelers that create backpacker style trips all around the world for like-minded travelers. #GetBusyLivin'","website":"http:\/\/www.FNEZ.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_13716087_75sq_1321989524.jpg","full_name":"Free \u0026 Easy Traveler","id":"13716087"},{"username":"erikabetlamini","bio":"Everything I'm Not Made Me Everything I Am...","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_270706068_75sq_1364529543.jpg","full_name":"Erika Betlamini","id":"270706068"},{"username":"dylanswanborough","bio":"Mmhmm","website":"","profile_picture":"http:\/\/photos-g.ak.instagram.com\/hphotos-ak-xfa1\/10570175_1437905856491582_408076649_a.jpg","full_name":"Dylan Swanborough","id":"7473530"},{"username":"winnie_clark","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_214642815_75sq_1346555028.jpg","full_name":"","id":"214642815"},{"username":"taylorshanaman","bio":"Emojis speak louder than words","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_252856079_75sq_1396194168.jpg","full_name":"Taylor","id":"252856079"},{"username":"dogfan","bio":"","website":"","profile_picture":"http:\/\/photos-g.ak.instagram.com\/hphotos-ak-xpf1\/10424477_310548562443862_156285036_a.jpg","full_name":"emma \ud83d\udc1d","id":"47478296"},{"username":"kellyslater","bio":"Check our Samsung commercial for the ASP World Tour","website":"http:\/\/bit.ly\/SamsungASPFilm","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_8139971_75sq_1333949277.jpg","full_name":"kellyslater","id":"8139971"},{"username":"asp","bio":"World's best surfers, world's best waves...","website":"http:\/\/bit.ly\/HurleyProVOTE","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_21991224_75sq_1382981547.jpg","full_name":"ASP World Tour Surfing","id":"21991224"},{"username":"thesurfchannel","bio":"A national television network dedicated to surfers, surfing and surf culture. @TheSkateChannel @TheSkiChannel","website":"http:\/\/www.TheSurfChannel.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_187040019_75sq_1358711369.jpg","full_name":"Surf Channel \ud83c\udfa5","id":"187040019"},{"username":"edwinbeange","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_1282364931_75sq_1398138733.jpg","full_name":"Edwin R. Beange","id":"1282364931"},{"username":"nhatton16","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_357418492_75sq_1395609444.jpg","full_name":"Nathan","id":"357418492"},{"username":"jessejamespratt","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_9120143_75sq_1372422317.jpg","full_name":"Jesse Pratt","id":"9120143"},{"username":"sannetimmer","bio":"\ud83d\udc12","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_16060844_75sq_1380214516.jpg","full_name":"Sanne Timmer","id":"16060844"},{"username":"carrie_okee","bio":"I'm your Accordion Playing, Karaoke Singing, World Traveling, Outdoors Loving, Freelance Writing, Free and Easy Leader!","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_217609785_75sq_1349154439.jpg","full_name":"Carrie Robinson","id":"217609785"},{"username":"vief123","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_243367446_75sq_1360664964.jpg","full_name":"Vivian","id":"243367446"},{"username":"dusty_anderson89","bio":"Live For Today \ud83c\udf0e","website":"http:\/\/www.fnez.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_25393373_75sq_1355427131.jpg","full_name":"Dusty Anderson","id":"25393373"},{"username":"beyondboarding","bio":"Beyond Boarding is an organization dedicated to spreading interest in humanitarian work within the snowboarding community.","website":"http:\/\/beyondboarding.org","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_326427977_75sq_1363206079.jpg","full_name":"beyondboarding","id":"326427977"},{"username":"aguywithfeet","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_8009063_75sq_1333255394.jpg","full_name":"Just A Guy","id":"8009063"},{"username":"giraffetalez","bio":"\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u25ab\ufe0f\u25aa\ufe0f\u25ab\ufe0f\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800Three tall men doing neat things\u2800","website":"http:\/\/giraffetalez.tumblr.com","profile_picture":"http:\/\/photos-h.ak.instagram.com\/hphotos-ak-xpa1\/925849_1438226553098375_1706725686_a.jpg","full_name":"","id":"178074326"},{"username":"jsaucecheddar","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_181903319_75sq_1339645645.jpg","full_name":"","id":"181903319"},{"username":"latermag","bio":"Travel. Surf. Easy Livin'.","website":"http:\/\/LATERmag.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_19676120_75sq_1391823467.jpg","full_name":"LATER. mag","id":"19676120"},{"username":"stephanyfranzisca","bio":"\u2764Hello World\u2764\u0950","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_234148169_75sq_1390929871.jpg","full_name":"","id":"234148169"},{"username":"kenztaylor8","bio":"i adore you. \ud83c\udfb6","website":"","profile_picture":"http:\/\/photos-c.ak.instagram.com\/hphotos-ak-xfa1\/10576142_765163963534874_252287387_a.jpg","full_name":"Mackenzie Taylor","id":"26555936"},{"username":"angyla_b","bio":"\ud83d\ude02\ud83d\ude48\ud83c\udf34\ud83c\udf6a\u2708\ufe0f\ud83d\udebc\ud83c\udfa8\ud83d\udc18\ud83d\ude0f","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_22413375_75sq_1383811173.jpg","full_name":"Angela","id":"22413375"},{"username":"rondeau728","bio":"Vancouver, BC","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_905726827_75sq_1388798676.jpg","full_name":"Paul","id":"905726827"},{"username":"amytebbutt","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_1282410556_75sq_1398140862.jpg","full_name":"Amy T","id":"1282410556"},{"username":"allienassichuk","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_1284349705_75sq_1398232397.jpg","full_name":"Allie Nassichuk","id":"1284349705"},{"username":"habitcoffee","bio":"","website":"http:\/\/habitcoffee.com","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_28525960_75sq_1389983428.jpg","full_name":"habitcoffee","id":"28525960"},{"username":"coco__h_","bio":"\u2600\ufe0f\ud83c\udf35\ud83c\udf0a\ud83c\udf35\u2600\ufe0f ma ma maybach music","website":"","profile_picture":"http:\/\/photos-d.ak.instagram.com\/hphotos-ak-xpf1\/10536827_495431780602091_1843312876_a.jpg","full_name":"Courtney","id":"1292681"},{"username":"breanne_leib","bio":"be yourself, and everyone will look. \ud83d\udc1d","website":"","profile_picture":"http:\/\/photos-c.ak.instagram.com\/hphotos-ak-xaf1\/10561146_652333521511770_1182418810_a.jpg","full_name":"breanne leib","id":"325796268"},{"username":"bringgoldphotography","bio":"Change your perspective. Change your story.","website":"http:\/\/www.bringgoldphotography.com","profile_picture":"http:\/\/photos-g.ak.instagram.com\/hphotos-ak-xpa1\/925264_777896742244302_2040907078_a.jpg","full_name":"Ross Bringgold","id":"1227275314"},{"username":"dani_alysa","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_17874066_75sq_1391249146.jpg","full_name":"Danielle Pifer","id":"17874066"},{"username":"crazedclimber","bio":"","website":"http:\/\/scottkennedya.ca","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_343524883_75sq_1396610605.jpg","full_name":"Scott Kennedy","id":"343524883"},{"username":"devhil","bio":"","website":"","profile_picture":"http:\/\/photos-c.ak.instagram.com\/hphotos-ak-xpf1\/10453939_694608417240882_1580982270_a.jpg","full_name":"devhil","id":"9588649"}];

		this.getFollowsArray = function(){
			return this.follows;
		}
		
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