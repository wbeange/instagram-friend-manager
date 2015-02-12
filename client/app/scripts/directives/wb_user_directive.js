 angular.module('clientApp').directive('wbUser', function($compile) {
  return {
    restrict: "A",
    replace: true,
    scope: {
      user: "=wbUser"  
    },

    link: function(scope, element, attrs) {

      var html = ' \
        <div class="" style="margin-left:auto;margin-right:auto;padding-top:3px;"> \
          <a href="http://instagram.com/{{user.username}}" target="_blank"> \
            <img class="ui-corner-all img-rounded" ng-src="{{user.profile_picture}}" alt="..." style="width:100%;"> \
          </a> \
        </div>';

      element.html(html);
      $compile(element.contents())(scope); 


      // element.bind('mouseenter', function() {
      //   $('#blah').text(scope.user.id);

      //   // var html = '<div id="' + elId + '" style="width=30px;height=300px;">'+scope.user.username+'</div>';

      //   // html = $(html);
      //   // $('body').append(html);

      //   // html.css('margin', 'auto');
      //   // html.css('position', 'fixed');
      //   // html.css('z-index', 9999);
      //   // html.css({top: 0, left: 0, bottom: 0, right: 0});
      //   // html.css('width', '300px');
      //   // html.css('height', '300px');
      //   // html.css('background-color', 'white');
      // });

      // element.bind('mouseleave', function() {
      //   $('#' + elId).remove();
      // });
    }
  }
});
