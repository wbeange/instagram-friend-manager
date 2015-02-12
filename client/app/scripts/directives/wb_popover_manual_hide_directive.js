'use strict';

angular.module('clientApp').directive('wbPopoverManualHide', function($rootScope) {
  return {
    restrict: 'A',
    scope: {
      user: '=wbPopoverManualHide'
    },

    link: function(scope, element) {
      // manually suppress popover hide when interacting with popover
      // manually trigger popover hide when leaving popover
      $( element )
        
        .on('mouseenter', function() { 
          // console.log('popover enter', scope.user.id);
          $rootScope.$emit('cancel-mouse-leave', scope.user.id);
        })

        .on('mouseleave', function() { 
          // console.log('popover exit', scope.user.id);
          $rootScope.$emit('close-popovers', scope.user.id);
        });

      // cleanup
      scope.$on('$destroy', function() {
        $( element ).unbind('mouseenter');
        $( element ).unbind('mouseleave');
      }); 
    }
  }
});
