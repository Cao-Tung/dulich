(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PostDetailController', PostDetailController);

    PostDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Post', 'Place'];

    function PostDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Post, Place) {
        var vm = this;

        vm.post = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('dulichApp:postUpdate', function(event, result) {
            vm.post = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
