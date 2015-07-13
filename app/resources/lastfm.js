angular.module('app')
  .service('Lastfm', ['$http', function ($http) {
    return {
      getTopAlbums: function (username) {
        return $http({
          url: 'http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + username + '&api_key=de796dc0e5687dd2b3054eea82c4ac83&format=json',
          method: 'GET'
        });
      }
    }
  }]);
