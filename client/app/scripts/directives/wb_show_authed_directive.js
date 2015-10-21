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
        // TODO: ngCloak directive isn't working -
        // manually using hidden class and removing on directive load as a crutch
        element.removeClass('hidden');

        element.hide();

        if(Auth.isSignedIn()) {
          element.show();
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
