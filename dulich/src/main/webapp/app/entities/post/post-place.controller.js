(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PostPlaceController', PostPlaceController);

    PostPlaceController.$inject = ['$scope', '$state', 'posts', 'tours', 'hotels'];

    function PostPlaceController ($scope, $state, posts, tours, hotels) {
        var vm = this;
        
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
