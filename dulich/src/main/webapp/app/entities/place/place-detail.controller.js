(function() {
    'use strict';

    angular
        .module('dulichApp')
        .controller('PlaceDetailController', PlaceDetailController);

    PlaceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Place', 'Post', 'Hotel', 'Tour', 'Region'];

    function PlaceDetailController($scope, $rootScope, $stateParams, previousState, entity, Place, Post, Hotel, Tour, Region) {
        var vm = this;

        vm.place = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dulichApp:placeUpdate', function(event, result) {
            vm.place = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
