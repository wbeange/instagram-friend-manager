'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:wbLoadingIndicator
 * @description
 * # wbLoadingIndicator
 */
angular.module('clientApp')
  .directive('wbLoadingIndicator', function ($rootScope) {
    return {
      scope: {
        isLoading: "=wbLoadingIndicator"
      },
      restrict: 'A',
      link: function link(scope, element, attrs) {

        var toggleLoadingClass = function() {
          if(scope.isLoading === undefined) return;

          if(scope.isLoading) {
            element.addClass('loading-spinner');
          } else {
            element.removeClass('loading-spinner');
          }
        }

        toggleLoadingClass();

        scope.$watch('isLoading', function() {
          toggleLoadingClass();
        });

      }
    };
  });
