angular.module('app')
  .service('Lastfm', ['$http', function ($http) {
    return {
      getTopAlbums: function (username) {
        return $http({
          url: 'http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=' + username + '&api_key=3db2001ed34ece662b280fd5e2b7fbb8&format=json',
          method: 'GET'
        });
      }
    }
  }]);
