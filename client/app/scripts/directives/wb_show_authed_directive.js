'use strict';

/**
 * @ngdoc directive
 * @name instagramFriendManagerApp.directive:wbShowAuthed
 * @description
 * # wbShowAuthed
 */
angular.module('clientApp')
  .directive('wbShowAuthed', function (Auth) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if(!Auth.isSignedIn()) {
          element.hide();
        }

        scope.$on('wb-authenticated', function(event, isLoggedIn) {
          if(isLoggedIn) {
            element.show();
          } else {
            element.hide();
          }
        });
      }
    };
  });
