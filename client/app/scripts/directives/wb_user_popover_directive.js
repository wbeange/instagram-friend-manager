 angular.module('clientApp').directive('wbUserPopover', function($compile, $timeout) {
  return {
    restrict: "A",
    replace: true,
    scope: {
      user: "=wbUserPopover"  
    },

    link: function(scope, element, attrs) {

      $( element ).popover({
        html: false,
        placement: 'bottom',
        trigger: 'hover',
        content: scope.user.username,
        delay: 0
      });

    }
  }
});
