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
        vm.content = {
            title:'Mai anh đào khoe sắc đầu xuân, hút khách hai miền',
            image:'../content/images/ivivuSapa.jpg',
            imageSapa:'../content/images/Sapa.jpg',
            image1:'../content/images/ivivuSapa1.jpg',
            image2:'../content/images/ivivuSapa2.jpg'
        }
    }
})();
