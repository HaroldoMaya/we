(function() {

  define([
    'angular'
  ], function (
    angular
  ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('avatar', [
      '$compile',
      function($compile) {
        return{
          restrict:"EA",
          link:function (scope, elm, attrs) {

            scope.$watch(attrs.avatar, function (avatarId) {
              var tag;
              var avatarLink = '';
              var size_class;

              if(attrs['avatarLink']){
                avatarLink = attrs['avatarLink'];
              }

              switch(attrs['avatarSize']) {
                case 'medium':
                  size_class = ' width="200px" height="200px" class="img-rounded avatar-medium" ';
                  break;
                default:
                  size_class = ' width="50px" height="50px" class="img-rounded avatar-small" ';
              }

              if ((avatarId !== null) && (avatarId !== undefined) && (avatarId !== '')) {
                tag = '<img '+size_class+' data-ng-src="/images/' + avatarId +'">';
              } else {
                tag = '<img '+size_class+' data-ng-src="/imgs/avatars/user-avatar.png">';
              }

              if(avatarLink){
                tag = '<a href="'+avatarLink+'">'+ tag +'</a>';
              }

              elm.html( $compile(tag)(scope) );
            });
          }
        };
      }
    ]);
  });
}());
