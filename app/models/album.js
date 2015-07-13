angular.module('app')
  .factory('Album', [function () {
    // TODO: correct creation of Album instances
    var Album = function (name, playcount, image) {
      this.name = name;
      this.playcount = playcount;
      this.image = image;
    };

    return Album;
  }]);
