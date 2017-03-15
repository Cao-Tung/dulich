(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', '$state', 'DataUtils', 'Post'];

    function PostController ($scope, $state, DataUtils, Post) {
        var vm = this;

        vm.posts = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Post.query(function(result) {
                vm.posts = result;
                vm.searchQuery = null;
            });
        }
    }
})();
