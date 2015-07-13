angular.module('app', ['rx'])
  .controller('AppCtrl', ['$scope', '$http', '$location', 'Album', 'Lastfm', function ($scope, $http, $location, Album, Lastfm) {
    var submitFormObservable,
      inputObservable,
      lastFmResponseStream;

    function setQueryFromTheUrl() {
      $scope.query = $scope.query || {};

      $scope.query = {
        username: $location.search().username
      };
    }

    function getTopAlbumsForUser(username) {
      return Rx.Observable.fromPromise(Lastfm.getTopAlbums(username));
    }

    function mapAlbumsToModels(albums) {
      var result = [];

      angular.forEach(albums, function (albumInfo) {
        var album = new Album();
        album.fromLastfmAlbumInfo(albumInfo);
        result.push(album);
      });

      return result;
    }

    function errorStream(lastFmResponseStream) {
      return lastFmResponseStream
      .filter(function (response) {
          return response.data.error;
        })
        .map(function (response) {
          return response.data;
        });
    }

    function albumStream(lastFmResponseStream) {
      return lastFmResponseStream
        .filter(function (response) {
          return !response.data.error;
        })
        .map(function (response) {
          return response.data.topalbums.album;
        });
    }

    // read the query parameter on the initial page load
    setQueryFromTheUrl();

    // update query parameter when the URL changes
    $scope.$on('$locationChangeSuccess', setQueryFromTheUrl);

    // create an observable from the search method
    submitFormObservable = $scope.$createObservableFunction('search');

    // create an observable from the query model
    inputObservable = $scope.$toObservable('query.username')
      .map(function (change) {
        return change.newValue;
      })
      .do(function (username) {
        username = username || null;
        $location.search('username', username);
      });

    lastFmResponseStream = Rx.Observable.merge([submitFormObservable, inputObservable])
      .where(function (username) {
        return username && username.length > 0;
      })
      .debounce(400)
      .distinctUntilChanged()
      .select(getTopAlbumsForUser)
      .switchLatest(); // preserve ordering - some requests can take more time to complete

    // stream containing the album information from LastFm
    albumStream(lastFmResponseStream)
      .map(mapAlbumsToModels)
      .subscribe(function (albums) {
        $scope.error = undefined;
        $scope.albums = albums;
      });

    // stream returning possible errors from LastFm
    errorStream(lastFmResponseStream)
      .subscribe(function (error) {
        $scope.albums = [];
        $scope.error = error;
      });

  }]);
