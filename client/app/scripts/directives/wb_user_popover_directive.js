'use strict';

angular.module('clientApp').directive('wbUserPopover', function($rootScope, $compile, $timeout, $templateCache, UserModel, UserRelationshipModel) {
  return {
    restrict: 'A',
    scope: {
      user: '=wbUserPopover'
    },

    link: function(scope, element, attrs) {

      //
      // link variables and functions
      //

      var popoverHideTimeout;
      var popoverInitialized = false;

      var cancelHideTimer = function() {
        if(popoverHideTimeout) {
          $timeout.cancel(popoverHideTimeout);
          popoverHideTimeout = undefined;
        }
      }

      var popoverManualHide = function() {
        cancelHideTimer();

        popoverHideTimeout = $timeout(function() {
          // simply hide the popover element instead of removing it
          // $('#'+scope.userPopoverId).popover('hide');
          $( element ).next().hide();
        }, 100);
      }

      var loadPopoverContent = function() {

        // cancel delayed trigger popover hide
        cancelHideTimer();

        // event to hide all other popovers
        $rootScope.$broadcast('popover:init', scope.user.id);

        // manually trigger popover show (create popover element)
        $('#'+scope.userPopoverId).popover('show');

        UserRelationshipModel.get(scope.user.id).then(function(data) {
          scope.relationship = data;

          // Note - we are cheating here allowing delay to fix load delay issue
          // keep popover open when hovered inside it
          $('#'+scope.popoverId)
            .mouseenter(function(){ cancelHideTimer(); })
            .mouseleave(function(){ popoverManualHide(); });

          // Handle private unfollowed users case
          if(!data.target_user_is_private || data.outgoing_status != 'none') {
            UserModel.get(scope.user.id).then(function(data) {
              scope.user = data;
            });
          }
        });
      }

      //
      // view variables and functions
      //

      // close popover if another is triggered
      scope.$on('popover:init', function(event, id) {
        // ignore if called from this id
        if(scope.user === undefined || scope.user.id == id) return;

        // cancel delayed hide
        cancelHideTimer();

        // simply hide the popover element instead of removing it
        // $('#'+scope.userPopoverId).popover('hide');
        $( element ).next().hide();
      });

      scope.follow = function(userId) {
        UserModel.follow(userId);
      }

      scope.unfollow = function(userId) {
        UserModel.unfollow(userId);
      }

      //
      // init popover when user is loaded
      //

      $(element).mouseenter(function() {

        if(popoverInitialized) return;
        popoverInitialized = true;

        // wait for parent to load
        if(scope.user === undefined) return;

        // init view selectors
        scope.userPopoverId = 'user_popover_' + scope.user.id;
        scope.popoverId = 'popover_id_' + scope.user.id;

        //
        // initiate Javascript Bootstrap Popover Plugin
        //

        // parse HTML into DOM element
        var template = angular.element( $templateCache.get('user_popup_template') );

        // compile the template
        var linkFn = $compile(template);

        // link the compiled template with the scope
        var popoverElement = linkFn(scope);

        // attach popover to indicator
        $('#'+scope.userPopoverId)

          // init popover
          .popover({
            html: true,
            placement: 'bottom',
            trigger: 'manual',
            content: popoverElement
          })

          // show and load content event on mouse enter
          .mouseenter(function(){ loadPopoverContent(); })

          // hide on mouse leave
          .mouseleave(function(){ popoverManualHide(); })

          // allow click as well for mobile
          .click(function() { loadPopoverContent(); });

        // manually show the first time
        loadPopoverContent();

      });
    }
  }
});