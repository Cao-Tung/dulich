(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceDetailController', PlaceDetailController);

    PlaceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Place', 'Post', 'Hotel', 'Tour', 'Region'];

    function PlaceDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Place, Post, Hotel, Tour, Region) {
        var vm = this;

        vm.place = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('dulichApp:placeUpdate', function(event, result) {
            vm.place = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
