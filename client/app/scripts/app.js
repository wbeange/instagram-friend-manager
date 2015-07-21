'use strict';

angular
  // app
  .module('clientApp', [
    'ngRoute',
    'ngCookies'
  ])
  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/followers',   { controller: 'FollowersCtrl',  templateUrl: 'views/main.html', reloadOnSearch: false })
      .when('/following',   { controller: 'FollowingCtrl',  templateUrl: 'views/main.html', reloadOnSearch: false })
      .when('/friends',     { controller: 'FriendsCtrl',    templateUrl: 'views/main.html', reloadOnSearch: false })
      .when('/fans',        { controller: 'FansCtrl',       templateUrl: 'views/main.html', reloadOnSearch: false })
      .when('/idols',       { controller: 'IdolsCtrl',      templateUrl: 'views/main.html', reloadOnSearch: false })
      .when('/login',       { controller: 'LoginCtrl',      templateUrl: 'views/login.html', reloadOnSearch: false })

      .otherwise({ redirectTo: '/login', reloadOnSearch: false });
  })

  .config(function($locationProvider, $httpProvider) {
    // CORS requests with credentials
    $httpProvider.defaults.withCredentials = true;

    // HttpInterceptor to handle 401s
    $httpProvider.interceptors.push('HttpInterceptor');
  })

  .run(function($rootScope, Auth) {
    // initiate authentication handler
    Auth.init();
  });
