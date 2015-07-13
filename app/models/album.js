angular.module('app')
  .factory('Album', [function () {
    function Album(name, playcount, image) {
      this.name = name;
      this.playcount = playcount;
      this.image = image;
    }

    Album.prototype.fromLastfmAlbumInfo = function (albumInfo) {
      this.name = albumInfo.name;
      this.playcount = albumInfo.playcount;
      this.image = albumInfo.image[3]['#text'];
    };

    return Album;
  }]);
