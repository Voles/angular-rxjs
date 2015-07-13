angular.module('app', ['rx', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'AppCtrl',
        templateUrl: 'components/app/app.html'
      });
  }]);
