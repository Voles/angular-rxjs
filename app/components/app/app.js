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

    function searchLastFm(username) {
      return Rx.Observable.fromPromise(Lastfm.getTopAlbums(username));
    }

    function mapAlbumsToModels(albums) {
      var result = [];

      angular.forEach(albums, function (albumInfo) {
        result.push(new Album(albumInfo.name, albumInfo.playcount, albumInfo.image[3]['#text']));
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
      .select(searchLastFm)
      .switchLatest(); // preserve ordering - some requests can take more time to complete

    albumStream(lastFmResponseStream)
      .map(mapAlbumsToModels)
      .subscribe(function (albums) {
        $scope.error = undefined;
        $scope.albums = albums;
      });

    errorStream(lastFmResponseStream)
      .subscribe(function (error) {
        $scope.albums = [];
        $scope.error = error;
      });

  }]);
