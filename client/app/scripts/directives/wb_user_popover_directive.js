 angular.module('clientApp').directive('wbUserPopover', function($rootScope, $compile, $timeout, $interpolate, $templateCache, UserModel) {
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

      // initialize Javascript Bootstrap Popover library element
      $( element ).popover({
        html: true,
        placement: 'auto',
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
        }, 750);        
      }

      var cancelMouseoverEvent = function () {
        if(mouseoverEvent) {
          $timeout.cancel(mouseoverEvent);
          mouseoverEvent = undefined;
        }
      }
      
      $( element )

        // when you enter tile preview, show popover
        .on('mouseenter', function() {
          $rootScope.$broadcast('close-all-popovers', scope.user.id);

          // manually show popover
          cancelMouseoverEvent();
          $( element ).popover('show');

          // compile html on hover for ng-src directive, to enable user object 2-way binding
          $compile( $( element ).next().contents() )(scope);
          
          // manually suppress popover hide when interacting with popover
          // manually trigger popover hide when leaving popover
          $('#'+elId)
            .on('mouseenter', cancelMouseoverEvent)
            .on('mouseleave', setMouseoverEvent);


          // call server for more profile info
          if(UserModel.isLoading === false && scope.user.counts.media === "---") {
            
            UserModel.get(scope.user.id).then(function(data) {

              // set each attr individually so reference isn't broken
              scope.user.counts.media       = data.counts.media;
              scope.user.counts.follows     = data.counts.follows;
              scope.user.counts.followed_by = data.counts.followed_by;
            });
          }
        })

        // manually trigger popover hide
        .on('mouseleave', setMouseoverEvent);


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