 angular.module('clientApp').directive('wbUserPopover', function($rootScope, $compile, $timeout, $interpolate, $templateCache) {
  return {
    restrict: "A",
    replace: true,
    scope: {
      user: "=wbUserPopover"  
    },

    link: function(scope, element, attrs) {
      var elId = 'user_popover_' + scope.user.id;

      // view in template
      var html = $templateCache.get('user_popup_template');

      // pop var w/ interpolate
      html = $interpolate(html)({ elId: elId, user: scope.user });

      // initialize Javascript Bootstrap Popover library element
      $( element ).popover({
        html: true,
        placement: 'bottom',
        trigger: 'manual',
        content: html
      });


      // manually handling popover on/off
      var mouseoverEvent;

      var setMouseoverEvent = function() {
        cancelMouseoverEvent();

        mouseoverEvent = $timeout(function() {
          // manually hide popover
          $( element ).popover('hide');
        }, 500);        
      }

      var cancelMouseoverEvent = function () {
        if(mouseoverEvent) {
          $timeout.cancel(mouseoverEvent);
          mouseoverEvent = undefined;
        }
      }
      
      $( element )

        // manually trigger popover hide
        .on('mouseleave', setMouseoverEvent)

        // when you enter tile preview, show popover
        .on('mouseenter', function() {
          $rootScope.$broadcast('close-all-popovers', scope.user.id);

          $( element ).popover('show');

          // compile html on hover for ng-src directive, etc...
          $compile( $('#'+elId).contents() )(scope);

          // manually show popover
          cancelMouseoverEvent();
          
          // manually suppress popover hide when interacting with popover
          // manually trigger popover hide when leaving popover
          $('#'+elId)
            .on('mouseenter', cancelMouseoverEvent)
            .on('mouseleave', setMouseoverEvent);     
      });

      // TODO - using event handling to close all other popovers is bad
      var closeAllPopovers = $rootScope.$on('close-all-popovers', function(event, userId) {
        if(scope.user.id !== userId) {
          cancelMouseoverEvent();
          $( element ).popover('hide');
        }
      });


      // cleanup
      scope.$on('$destroy', function() {
        closeAllPopovers();
        cancelMouseoverEvent();
        $( element ).unbind('mouseenter');
        $( element ).unbind('mouseleave');
        $('#'+elId).unbind('mouseenter');
        $('#'+elId).unbind('mouseleave');
      });
    }
  }
});