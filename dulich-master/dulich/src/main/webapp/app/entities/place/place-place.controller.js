(function() {
    'use strict';

    angular
    .module('dulichApp')
    .controller('PlacePlaceController', PlacePlaceController);

    PlacePlaceController.$inject = ['$scope', '$state', 'posts', 'tours', 'hotels', 'postsview', 'entity', 'Post'];

    function PlacePlaceController ($scope, $state, posts, tours, hotels, postsview, entity, Post) {
        var vm = this;
        vm.entity = entity;
        vm.sr= posts;
        // vm.sr = Post.search({title : a});
        vm.postsview=postsview;
        vm.newpost=posts; //dùng để in ra các bài viết mới đăng
        vm.posts = posts;
        vm.tours = tours;
        vm.hotels = hotels;
        vm.currentPage=1;
        vm.datas=[];
        vm.pageSize=8;
        vm.size=vm.posts.length;
        $scope.checked=true;
        $scope.color1="gray";
        $scope.color2="none";

        $scope.disable1=function(){
            $scope.checked=true;
            $scope.color1="gray";
            $scope.color2="none";
        }
        $scope.disable2=function(){
            $scope.checked=false;
            $scope.color1="none";
            $scope.color2="gray";
        }


        vm.search = function(){
         // sr : Post.search({title : "Hoa"}).$promise;
         $state.go('place-search',{title : $scope.title});
     }

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
