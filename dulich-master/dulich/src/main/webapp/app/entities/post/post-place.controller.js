(function() {
  'use strict';

  angular
  .module('dulichApp')
  .controller('PostPlaceController', PostPlaceController);

  PostPlaceController.$inject = ['$scope', '$state', 'posts', 'tours', 'hotels','entity'];

  function PostPlaceController ($scope, $state, posts, tours, hotels,entity) {
    var vm = this;
    vm.post = entity;
    $scope.uploadme;
//     var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(mymap);
//     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'your.mapbox.project.id',
//     accessToken: 'your.mapbox.public.access.token'
// }).addTo(mymap);

    $scope.uploadImage = function() {
      var fd = new FormData();
      var imgBlob = dataURItoBlob($scope.uploadme);
      fd.append('file', imgBlob);
      $http.post(
        'imageURL',
        fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }
        )
      .success(function(response) {
        console.log('success', response);
      })
      .error(function(response) {
        console.log('error', response);
      });
    }


    //you need this function to convert the dataURI
    function dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: mimeString
      });
    }

    vm.posts = posts;
    vm.tours = tours;
    vm.hotels = hotels;
  }
})();
