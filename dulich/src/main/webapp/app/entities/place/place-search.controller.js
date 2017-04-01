(function() {
    'use strict';

    angular
    .module('dulichApp')
    .controller('PlaceSearchController', PlaceSearchController);

    PlaceSearchController.$inject = ['$scope', '$state', 'postsearch', 'postsview','Post'];

    function PlaceSearchController ($scope, $state, postsearch, postsview, Post) {
        var vm = this;
        // vm.entity = entity;
        vm.sr= [];
        // vm.sr = Post.search({title : a});
        vm.postsview=postsview;
        vm.postsearch= postsearch;
        // vm.places=places;
        // vm.posts = posts;
        // vm.tours = tours;
        // vm.hotels = hotels;
        vm.currentPage=1;
        vm.datas=[];
        vm.pageSize=8;


        vm.search = function(){
          if($scope.title!=undefined && $scope.title != ""){
         console.log($scope.title);
            Post.search({
                title: $scope.title
            }, onSuccess, onError);

            function onSuccess(data) {
                // console.log(data);
                vm.sr=data;
                // console.log(vm.sr);
            }

            function onError(error) {
                console.log("data");
            }
          }
          else{
            vm.sr=postsview;
          }
     }

     $scope.tong=function(){
      vm.size=vm.sr.length;
        return Math.ceil(vm.size/vm.pageSize);
    }
    $scope.$watch("vm.currentPage + vm.pageSize",function(){
      vm.size=vm.sr.length;
      var begin=(vm.currentPage-1)*vm.pageSize,
      end=begin + vm.pageSize;
      vm.datas=vm.sr.slice(begin,end);
      console.log(vm.datas);
  });
}
})();
