angular.module('app')
  .directive('albumList', [function () {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        albums: '='
      },
      templateUrl: 'components/album-list/album-list.html'
    }
  }]);
