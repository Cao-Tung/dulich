(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlacePlaceController', PlacePlaceController);

    PlacePlaceController.$inject = ['$scope', '$state', 'posts', 'tours', 'hotels','places', 'postsview'];

    function PlacePlaceController ($scope, $state, posts, tours, hotels,places, postsview) {
        var vm = this;
        vm.postsview=postsview;
        vm.places=places;
        vm.posts = posts;
        vm.tours = tours;
        vm.hotels = hotels;
        vm.currentPage=1;
        vm.datas=[];
        vm.pageSize=8;
        vm.size=vm.posts.length;
        $scope.tong=function(){
            return Math.ceil(vm.size/vm.pageSize);
              }
                $scope.$watch("vm.currentPage + vm.pageSize",function(){
                  var begin=(vm.currentPage-1)*vm.pageSize,
                  end=begin + vm.pageSize;
                  vm.datas=vm.posts.slice(begin,end);
                });



    }
})();
